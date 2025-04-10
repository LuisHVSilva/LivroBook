import {UpdateActiveUseCase} from "@status/application/updateActive/updateActiveUseCase";
import {MockStatusRepository} from "@mocks/Status/mockStatusRepository";
import {MockLogger} from "@mocks/mockLogger";
import {StatusPayload} from "@payloads/statusPayload";
import {UpdateActiveDTO, UpdateActiveResponseDTO} from "@status/adapters/dtos/UpdateActiveDTO";
import {MockStatusDomainService} from "@mocks/Status/mockStatusDomainService";
import {StringUtils} from "@coreShared/utils/StringUtils";
import {Result} from "@coreShared/types/Result";
import {StatusMessages} from "@coreShared/messages/statusMessages";
import {ErrorMessages} from "@coreShared/messages/errorMessages";
import {UseCaseError} from "@coreShared/errors/useCaseError";

describe("updateActiveUseCase", () => {
    let updateActiveUseCase: UpdateActiveUseCase;
    let mockStatusRepository: MockStatusRepository;
    let mockLogger: MockLogger;
    let statusDomainServiceMock: MockStatusDomainService;
    const statusPayloadMock: StatusPayload = StatusPayload.createMock();
    const input: UpdateActiveDTO = {
        id: statusPayloadMock.id.toString(),
        active: false
    };

    beforeEach(async () => {
        mockStatusRepository = new MockStatusRepository();
        mockLogger = new MockLogger();
        statusDomainServiceMock = new MockStatusDomainService();

        updateActiveUseCase = new UpdateActiveUseCase(statusDomainServiceMock.mock, mockStatusRepository.mock, mockLogger.mock);
        await mockStatusRepository.withTransaction();
        await statusDomainServiceMock.withEnsureStatusExists();
    })

    afterEach(async () => {
        jest.clearAllMocks();
    })

    it("should update deactivate status", async () => {
        const stringUtilsSTN = jest.spyOn(StringUtils, "strToNumber");
        const domainServiceSpy = jest.spyOn(statusDomainServiceMock.mock, "ensureStatusExists");

        mockStatusRepository.withUpdateActive();

        const updatedActive: Result<UpdateActiveResponseDTO> = await updateActiveUseCase.execute(input);
        const resultValues: UpdateActiveResponseDTO = updatedActive.unwrapOrThrow();

        expect(mockLogger.logInfo).toHaveBeenCalledTimes(1);
        expect(stringUtilsSTN).toHaveBeenCalledTimes(1);
        expect(domainServiceSpy).toHaveBeenCalledTimes(1);

        expect(mockStatusRepository.commit).toHaveBeenCalledTimes(1);
        expect(resultValues.message).toEqual(StatusMessages.Success.Activation.DEACTIVATED);
    })

    it("should update activate status", async () => {
        mockStatusRepository.withUpdateActive();

        input.active = true;
        const updatedActive: Result<UpdateActiveResponseDTO> = await updateActiveUseCase.execute(input);
        const resultValues: UpdateActiveResponseDTO = updatedActive.unwrapOrThrow();

        expect(mockStatusRepository.commit).toHaveBeenCalledTimes(1);
        expect(resultValues.message).toEqual(StatusMessages.Success.Activation.ACTIVATED);
    })

    it("should throw UseCaseError with UPDATED_FAILED message when error is not an instance of Error", async () => {
        mockStatusRepository.mock.updateActive.mockRejectedValue(ErrorMessages.Internal.INTERNAL_ERROR);
        const result: Result<UpdateActiveResponseDTO, UseCaseError> = await updateActiveUseCase.execute(input);
        expect(result.getError().message).toBe(ErrorMessages.Internal.INTERNAL_ERROR);
        expect(result.getError()).toBeInstanceOf(UseCaseError);
    });
})