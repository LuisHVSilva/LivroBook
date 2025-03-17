import {UpdateDescriptionUseCase} from "@status/application/usecases/updateDescriptionUseCase";
import {StatusRepositoryMock} from "@mocks/Status/statusRepositoryMock";
import {LoggerMock} from "@mocks/loggerMock";
import {StringUtils} from "@coreShared/utils/StringUtils";
import {StatusPayload} from "@payloads/statusPayload";
import {UseCaseError} from "@coreShared/errors/UseCaseError";
import {Messages} from "@coreShared/constants/messages";
import {StatusValidatorMock} from "@mocks/Status/statusValidatorMock";
import {UpdateDescriptionDTO, UpdateDescriptionResultDTO} from "@status/adapters/dtos/UpdateDescriptionDTO";
import {Result} from "@coreShared/types/Result";

const NEW_DESCRIPTION = "NEW DESCRIPTION";
const input: UpdateDescriptionDTO = {
    id: StatusPayload.id.toString(),
    newDescription: StatusPayload.validDescriptionFormatted
}

describe("updateDescriptionUseCase", () => {
    let updateDescriptionUseCase: UpdateDescriptionUseCase;
    let statusRepositoryMock: StatusRepositoryMock;
    let statusValidatorMock: StatusValidatorMock;
    let loggerMock: LoggerMock;

    beforeEach(() => {
        statusRepositoryMock = new StatusRepositoryMock();
        statusValidatorMock = new StatusValidatorMock();
        loggerMock = new LoggerMock();

        updateDescriptionUseCase = new UpdateDescriptionUseCase(
            statusRepositoryMock.mock, statusValidatorMock.mock, loggerMock.mock);
    });

    afterEach(() => {
        jest.clearAllMocks();
    })

    it("should update the status description", async () => {
        jest.spyOn(StringUtils, "transformCapitalLetterWithoutAccent").mockReturnValue(StatusPayload.validDescriptionFormatted);
        statusRepositoryMock.withFindById()
        statusRepositoryMock.withUpdateDescription();

        const newStatus: Result<UpdateDescriptionResultDTO> = await updateDescriptionUseCase.execute(input);

        expect(loggerMock.logInfo).toHaveBeenCalledTimes(2);
        expect(StringUtils.transformCapitalLetterWithoutAccent).toHaveBeenCalled();
        expect(statusRepositoryMock.mock.updateDescription).toHaveBeenCalled();
        expect(newStatus).toBeInstanceOf(Result<UpdateDescriptionResultDTO>);
        expect(newStatus.getValue().newDescription).toEqual(StatusPayload.validDescriptionFormatted);
        expect(newStatus.getValue().message).toEqual(Messages.Status.Success
            .UPDATED_TO(StatusPayload.validDescriptionFormatted, newStatus.getValue().newDescription));
    });

    // it("should return null when status id not found", async () => {
    //     statusRepositoryMock.withUpdateDescriptionNull();
    //
    //     const newStatus = await updateDescriptionUseCase.execute(input);
    //
    //     expect(newStatus).toBeNull();
    // });
    //
    // it("should throw error when trying to update a status with invalid id", async () => {
    //     const errorMessage = "Generic Error";
    //
    //     statusRepositoryMock.withUpdateDescriptionError(errorMessage);
    //
    //     await expect(updateDescriptionUseCase.execute(input)).rejects.toThrow(UseCaseError);
    //     await expect(updateDescriptionUseCase.execute(input)).rejects.toThrow(errorMessage);
    //
    //     expect(loggerMock.logError).toHaveBeenCalled();
    // });
    //
    // it("should throw UseCaseError with UPDATED_FAILED message when error is not an instance of Error", async () => {
    //     statusRepositoryMock.mock.updateDescription.mockRejectedValue(Messages.Status.Error.UPDATED_FAILED);
    //
    //     await expect(updateDescriptionUseCase.execute(input)).rejects.toThrow(Messages.Status.Error.UPDATED_FAILED);
    //
    //     expect(loggerMock.logError).toHaveBeenCalled();
    // });
})