import {GetStatusUseCase} from "@status/application/getStatus/getStatusUseCase";
import {MockStatusRepository} from "@mocks/Status/mockStatusRepository";
import {MockLogger} from "@mocks/mockLogger";
import {StatusPayload} from "@payloads/statusPayload";
import {Result} from "@coreShared/types/Result";
import {GetStatusResponseDTO} from "@status/adapters/dtos/GetStatusDTO";
import {UseCaseError} from "@coreShared/errors/useCaseError";
import {StatusMessages} from "@coreShared/messages/statusMessages";
import {ErrorMessages} from "@coreShared/messages/errorMessages";


describe("getStatusUseCase", () => {
    let getStatusUseCase: GetStatusUseCase;
    let mockStatusRepository: MockStatusRepository;
    let mockLogger: MockLogger;
    let statusPayloadMock: StatusPayload = StatusPayload.createMock();
    const input = {id: statusPayloadMock.id.toString()};

    beforeEach(() => {
        mockStatusRepository = new MockStatusRepository();
        mockLogger = new MockLogger();
        getStatusUseCase = new GetStatusUseCase(mockStatusRepository.mock, mockLogger.mock);
    });

    afterEach(() => {
        jest.clearAllMocks();
    })

    it("should successfully return a status", async () => {
        mockStatusRepository.withFindById();

        const result: Result<GetStatusResponseDTO, UseCaseError> = await getStatusUseCase.execute(input);

        expect(mockLogger.logInfo).toHaveBeenCalled();
        expect(mockStatusRepository.mock.findById).toHaveBeenCalledWith(1);
        expect(result.isSuccess()).toBeTruthy();
        expect(result.unwrapOrThrow()).toStrictEqual({
            message: StatusMessages.Success.Retrieval.FOUND_BY_ID,
            id: input.id,
            description: statusPayloadMock.description,
            active: statusPayloadMock.active,
        });
    });

    it("should return null for not found status id", async () => {
        mockStatusRepository.withFindByIdNull();

        const result: Result<GetStatusResponseDTO> = await getStatusUseCase.execute(input);
        expect(result.isFailure()).toBeTruthy();
        expect(result.getError().message).toBe(StatusMessages.Error.Retrieval.ID_NOT_FOUND(parseInt(input.id)));
    });

    it("should throw error when failing to find status", async () => {
        mockStatusRepository.withFindByIdError(StatusMessages.Error.Retrieval.ID_NOT_FOUND(parseInt(input.id)));
        const result: Result<GetStatusResponseDTO, UseCaseError> = await getStatusUseCase.execute(input);

        expect(mockLogger.logError).toHaveBeenCalledTimes(1);
        expect(result.isFailure()).toBeTruthy()
        expect(result.getError().message).toBe(StatusMessages.Error.Retrieval.ID_NOT_FOUND(parseInt(input.id)));
        expect(result.getError()).toBeInstanceOf(UseCaseError);
    });

    it("should throw a generic message when error is not an instance of Error", async () => {
        mockStatusRepository.mock.findById.mockRejectedValueOnce(ErrorMessages.Internal.INTERNAL_ERROR);
        const result: Result<GetStatusResponseDTO, UseCaseError> = await getStatusUseCase.execute(input);
        expect(result.getError().message).toBe(ErrorMessages.Internal.INTERNAL_ERROR);
        expect(result.getError()).toBeInstanceOf(UseCaseError);
    });
});
