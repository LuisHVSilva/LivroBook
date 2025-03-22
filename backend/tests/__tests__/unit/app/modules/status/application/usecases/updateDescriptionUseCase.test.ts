import {UpdateDescriptionUseCase} from "@status/application/usecases/updateDescriptionUseCase";
import {StatusRepositoryMock} from "@mocks/Status/statusRepositoryMock";
import {LoggerMock} from "@mocks/loggerMock";
import {StringUtils} from "@coreShared/utils/StringUtils";
import {StatusPayload} from "@payloads/statusPayload";
import {Messages} from "@coreShared/constants/messages";
import {StatusValidatorMock} from "@mocks/Status/statusValidatorMock";
import {UpdateDescriptionDTO, UpdateDescriptionResponseDTO} from "@status/adapters/dtos/UpdateDescriptionDTO";
import {Result} from "@coreShared/types/Result";
import {UseCaseError} from "@coreShared/errors/UseCaseError";

describe("updateDescriptionUseCase", () => {
    const ONE: number = 1;
    const TWO: number = 2;
    const THREE: number = 3;
    const input: UpdateDescriptionDTO = {
        id: StatusPayload.id.toString(),
        newDescription: "NEW DESCRIPTION"
    };

    let updateDescriptionUseCase: UpdateDescriptionUseCase;
    let statusRepositoryMock: StatusRepositoryMock;
    let statusValidatorMock: StatusValidatorMock;
    let loggerMock: LoggerMock;

    beforeEach(() => {
        jest.clearAllMocks();
        statusRepositoryMock = new StatusRepositoryMock();
        statusValidatorMock = new StatusValidatorMock();
        loggerMock = new LoggerMock();

        updateDescriptionUseCase = new UpdateDescriptionUseCase(
            statusRepositoryMock.mock, statusValidatorMock.mock, loggerMock.mock);

        statusRepositoryMock.withTransaction();
        statusRepositoryMock.withFindById();
    });

    afterEach(() => {
        jest.clearAllMocks();
    })

    it("should update the status description", async () => {
        jest.spyOn(StringUtils, "transformCapitalLetterWithoutAccent").mockReturnValue(StatusPayload.validDescriptionFormatted);
        jest.spyOn(StringUtils, "strToNumber").mockReturnValue(StatusPayload.id);

        statusRepositoryMock.withFindById();
        statusRepositoryMock.withUpdateDescription();

        const newStatus: Result<UpdateDescriptionResponseDTO> = await updateDescriptionUseCase.execute(input);
        const newStatusValue: UpdateDescriptionResponseDTO = newStatus.getValue();

        expect(statusRepositoryMock.mock.startTransaction).toHaveBeenCalledTimes(ONE);
        expect(loggerMock.logInfo).toHaveBeenCalledTimes(TWO);
        expect(StringUtils.strToNumber).toHaveBeenCalledTimes(ONE);
        expect(StringUtils.transformCapitalLetterWithoutAccent).toHaveBeenCalledTimes(THREE);
        expect(statusRepositoryMock.mock.findById).toHaveBeenCalledTimes(ONE);
        expect(statusValidatorMock.mock.validateExistingStatus).toHaveBeenCalledTimes(ONE);
        expect(statusValidatorMock.mock.validateUniqueDescription).toHaveBeenCalledTimes(ONE);
        expect(statusRepositoryMock.mock.updateDescription).toHaveBeenCalledTimes(ONE);
        expect(statusRepositoryMock.commit).toHaveBeenCalledTimes(ONE);

        expect(newStatus.isSuccessful()).toBeTruthy();
        expect(newStatusValue.newDescription).toEqual(StatusPayload.validDescriptionFormatted);
        expect(newStatusValue.message).toEqual(
            Messages.Status.Success.UPDATED_TO(StatusPayload.validDescriptionFormatted, newStatus.getValue().newDescription)
        );
    });

    it("should throw error when trying to update a status with invalid id", async () => {
        statusRepositoryMock.withUpdateDescriptionError(Messages.Status.Error.UPDATED_FAILED);

        await expect(updateDescriptionUseCase.execute(input)).rejects.toThrow(
            new UseCaseError("UpdateDescriptionUseCase", Messages.Status.Error.UPDATED_FAILED)
        );

        expect(loggerMock.logError).toHaveBeenCalledTimes(ONE);
        expect(statusRepositoryMock.rollback).toHaveBeenCalledTimes(ONE);
    });

    it("should throw UseCaseError with UPDATED_FAILED message when error is not an instance of Error", async () => {
        statusRepositoryMock.mock.updateDescription.mockRejectedValue(Messages.Status.Error.UPDATED_FAILED);

        await expect(updateDescriptionUseCase.execute(input)).rejects.toThrow(Messages.Status.Error.UPDATED_FAILED);

        expect(loggerMock.logError).toHaveBeenCalled();
        expect(statusRepositoryMock.rollback).toHaveBeenCalledTimes(ONE);
    });
})