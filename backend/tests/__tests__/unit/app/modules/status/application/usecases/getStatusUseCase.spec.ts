import {GetStatusUseCase} from "@status/application/getStatus/getStatusUseCase";
import {LoggerMock} from "@mocks/loggerMock";
import {StatusRepositoryMock} from "@mocks/Status/statusRepositoryMock";
import {StatusPayload} from "@payloads/statusPayload";
import {Messages} from "@coreShared/messages/messages";
import {GetStatusResponseDTO} from "@status/adapters/dtos/GetStatusDTO";
import {Result} from "@coreShared/types/Result";
import {UseCaseError} from "@coreShared/errors/UseCaseError";

describe("getStatusUseCase", () => {
    let getStatusUseCase: GetStatusUseCase;
    let statusRepositoryMock: StatusRepositoryMock;
    let loggerMock: LoggerMock;
    let statusPayloadMock: StatusPayload = StatusPayload.createMock();
    const input = {id: statusPayloadMock.id.toString()};

    beforeEach(() => {
        statusRepositoryMock = new StatusRepositoryMock();
        loggerMock = new LoggerMock();
        getStatusUseCase = new GetStatusUseCase(statusRepositoryMock.mock, loggerMock.mock);
    });

    afterEach(() => {
        jest.clearAllMocks();
    })

    it("should successfully return a status", async () => {
        statusRepositoryMock.withFindById();

        const result: Result<GetStatusResponseDTO> = await getStatusUseCase.execute(input);

        expect(loggerMock.logInfo).toHaveBeenCalled();
        expect(statusRepositoryMock.mock.findById).toHaveBeenCalledWith(1);
        expect(result.isSuccessful()).toBe(true);
        expect(result.getValue()).toStrictEqual({
            message: Messages.Status.Success.FOUND_BY_ID,
            id: input.id,
            description: statusPayloadMock.description,
            active: statusPayloadMock.active,
        });
    });

    it("should return null for not found status id", async () => {
        statusRepositoryMock.withFindByIdNull();

        const result: Result<GetStatusResponseDTO> = await getStatusUseCase.execute(input);
        expect(result.isFailure()).toBe(true);
        expect(result.getError()).toBe(Messages.Status.Error.INVALID_ID(input.id))
    });

    it("should throw error when failing to find status", async () => {
        statusRepositoryMock.withFindByIdError(Messages.Status.Error.NOT_FOUND)
        await expect(getStatusUseCase.execute(input)).rejects.toThrow(
            new UseCaseError("GetStatusUseCase", Messages.Status.Error.NOT_FOUND)
        );

        expect(loggerMock.logError).toHaveBeenCalledTimes(1);
    });

    it("should throw a generic message when error is not an instance of Error", async () => {
        statusRepositoryMock.mock.findById.mockRejectedValueOnce(Messages.Status.Error.NOT_FOUND);
        await expect(getStatusUseCase.execute(input)).rejects.toThrow(Messages.Status.Error.NOT_FOUND);
    });
});
