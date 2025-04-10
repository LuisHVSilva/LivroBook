import {CreateStatusUseCase} from "@status/application/createStatus/createStatusUseCase"
import {StringUtils} from "@coreShared/utils/StringUtils";
import {CreateStatusResponseDTO} from "@status/adapters/dtos/CreateStatusDTO";
import {Result} from "@coreShared/types/Result";
import {StatusPayload} from "@payloads/statusPayload";
import {MockStatusRepository} from "@mocks/Status/mockStatusRepository";
import {MockLogger} from "@mocks/mockLogger";
import {MockStatusDomainService} from "@mocks/Status/mockStatusDomainService";
import {StatusMessages} from "@coreShared/messages/statusMessages";
import {UseCaseError} from "@coreShared/errors/useCaseError";
import {ErrorMessages} from "@coreShared/messages/errorMessages";

describe("CreateStatusUseCase", () => {
    let createStatusUseCase: CreateStatusUseCase;
    let mockStatusRepository: MockStatusRepository;
    let mockStatusDomainService: MockStatusDomainService;
    let mockLogger: MockLogger;

    const INPUT = {description: StatusPayload.createMock().description};

    beforeEach(() => {
        mockStatusRepository = new MockStatusRepository();
        mockLogger = new MockLogger();
        mockStatusDomainService = new MockStatusDomainService();
        createStatusUseCase = new CreateStatusUseCase(mockStatusRepository.mock, mockLogger.mock, mockStatusDomainService.mock);

        mockStatusRepository.withTransaction();
    });

    afterEach(() => {
        jest.clearAllMocks();
    })

    it("should successfully create a new status", async () => {
        mockStatusRepository.withCreate();

        const result: Result<CreateStatusResponseDTO> = await createStatusUseCase.execute(INPUT);
        const resultUnwrap = result.unwrapOrThrow();
        const transformedResult: string = StringUtils.transformCapitalLetterWithoutAccent(INPUT.description)

        expect(mockStatusRepository.mock.startTransaction).toHaveBeenCalledTimes(1);
        expect(mockStatusRepository.commit).toHaveBeenCalledTimes(1);
        expect(mockStatusRepository.mock.create).toHaveBeenCalled();
        expect(mockLogger.logInfo).toHaveBeenCalledTimes(2);
        expect(result.isSuccess()).toBeTruthy();
        expect(resultUnwrap.message).toBe(StatusMessages.Success.Creation(transformedResult))
        expect(resultUnwrap.id).toBeDefined();
    });

    it("should throw error when failing to create status", async () =>
    {
        mockStatusRepository.withCreateError(StatusMessages.Error.Failure.CREATION_FAILED);
        const result: Result<CreateStatusResponseDTO, UseCaseError> = await createStatusUseCase.execute(INPUT);

        expect(mockLogger.logError).toHaveBeenCalledTimes(1);
        expect(mockStatusRepository.mock.startTransaction).toHaveBeenCalledTimes(1);
        expect(mockStatusRepository.rollback).toHaveBeenCalledTimes(1);
        expect(result.isFailure()).toBeTruthy()
        expect(result.getError().message).toBe(StatusMessages.Error.Failure.CREATION_FAILED);
        expect(result.getError()).toBeInstanceOf(UseCaseError);
    });

    it("should throw a generic message when error is not an instance of Error", async () => {
        mockStatusRepository.mock.create.mockRejectedValue(null);
        await mockStatusRepository.withTransaction();

        const input = {description: "Falha"};
        const result: Result<CreateStatusResponseDTO, UseCaseError> = await createStatusUseCase.execute(input);
        expect(result.getError().message).toBe(ErrorMessages.Internal.INTERNAL_ERROR);
        expect(result.getError()).toBeInstanceOf(UseCaseError);

    });
});
