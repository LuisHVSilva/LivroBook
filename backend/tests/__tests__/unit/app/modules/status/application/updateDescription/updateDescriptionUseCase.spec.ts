import {UpdateDescriptionUseCase} from "@status/application/updateDescription/updateDescriptionUseCase";
import {StringUtils} from "@coreShared/utils/StringUtils";
import {StatusPayload} from "@payloads/statusPayload";
import {UpdateDescriptionDTO, UpdateDescriptionResponseDTO} from "@status/adapters/dtos/UpdateDescriptionDTO";
import {Result} from "@coreShared/types/Result";
import {UseCaseError} from "@coreShared/errors/useCaseError";
import {MockStatusRepository} from "@mocks/Status/mockStatusRepository";
import {MockLogger} from "@mocks/mockLogger";
import {MockStatusDomainService} from "@mocks/Status/mockStatusDomainService";
import {StatusMessages} from "@coreShared/messages/statusMessages";
import {ErrorMessages} from "@coreShared/messages/errorMessages";

describe("updateDescriptionUseCase", () => {
    const statusPayloadMock: StatusPayload = StatusPayload.createMock();
    const input: UpdateDescriptionDTO = {
        id: statusPayloadMock.id.toString(),
        newDescription: "NEW DESCRIPTION"
    };

    let updateDescriptionUseCase: UpdateDescriptionUseCase;
    let mockStatusRepository: MockStatusRepository;
    let mockLogger: MockLogger;
    let mockStatusDomainService: MockStatusDomainService;

    beforeEach(async () => {
        mockStatusRepository = new MockStatusRepository();
        mockLogger = new MockLogger();
        mockStatusDomainService = new MockStatusDomainService();

        updateDescriptionUseCase = new UpdateDescriptionUseCase(mockStatusDomainService.mock,
            mockStatusRepository.mock, mockLogger.mock);

        await mockStatusRepository.withTransaction();
        await mockStatusDomainService.withEnsureStatusExists();
        mockStatusRepository.withFindById();
    });

    afterEach(() => {
        jest.clearAllMocks();
    })

    it("should update the status description", async () => {
        const stringUtilsSTN = jest.spyOn(StringUtils, "strToNumber");
        mockStatusRepository.withUpdateDescription();

        const newStatus: Result<UpdateDescriptionResponseDTO> = await updateDescriptionUseCase.execute(input);
        const newStatusValue: UpdateDescriptionResponseDTO = newStatus.unwrapOrThrow();

        expect(mockStatusRepository.mock.startTransaction).toHaveBeenCalledTimes(1);
        expect(mockLogger.logInfo).toHaveBeenCalledTimes(2);
        expect(stringUtilsSTN).toHaveBeenCalledTimes(1);
        expect(mockStatusDomainService.mock.ensureStatusExists).toHaveBeenCalledTimes(1);
        expect(mockStatusRepository.mock.updateDescription).toHaveBeenCalledTimes(1);
        expect(mockStatusRepository.commit).toHaveBeenCalledTimes(1);

        expect(newStatus.isSuccess).toBeTruthy();
        expect(newStatusValue.newDescription).toEqual(input.newDescription);
        expect(newStatusValue.message).toEqual(
            StatusMessages.Success.Update(statusPayloadMock.description, input.newDescription)
        );
    });

    it("should throw error when trying to update a status with invalid id", async () => {
        mockStatusRepository.withUpdateDescriptionError(StatusMessages.Error.Failure.UPDATED_FAILED);

        const result: Result<UpdateDescriptionResponseDTO, UseCaseError> = await updateDescriptionUseCase.execute(input);

        expect(mockLogger.logError).toHaveBeenCalledTimes(1);
        expect(mockStatusRepository.rollback).toHaveBeenCalledTimes(1);
        expect(result.isFailure).toBeTruthy();
        expect(result.getError().message).toBe(StatusMessages.Error.Failure.UPDATED_FAILED);
    });

    it("should throw UseCaseError with UPDATED_FAILED message when error is not an instance of Error", async () => {
        mockStatusRepository.mock.updateDescription.mockRejectedValue("Error");

        const result: Result<UpdateDescriptionResponseDTO, UseCaseError> = await updateDescriptionUseCase.execute(input);

        expect(result.getError().message).toBe(ErrorMessages.Internal.INTERNAL_ERROR);
    });
})