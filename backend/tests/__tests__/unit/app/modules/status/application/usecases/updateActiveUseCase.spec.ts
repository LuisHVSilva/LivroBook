import {UpdateActiveUseCase} from "@status/application/updateActive/updateActiveUseCase";
import {StatusRepositoryMock} from "@mocks/Status/statusRepositoryMock";
import {StatusValidatorMock} from "@mocks/Status/statusValidatorMock";
import {LoggerMock} from "@mocks/loggerMock";
import {StringUtils} from "@coreShared/utils/StringUtils";
import {UpdateActiveDTO, UpdateActiveResponseDTO} from "@status/adapters/dtos/UpdateActiveDTO";
import {Result} from "@coreShared/types/Result";
import {StatusPayload} from "@payloads/statusPayload";
import {Messages} from "@coreShared/messages/messages";
import {UseCaseError} from "@coreShared/errors/UseCaseError";

describe("updateActiveUseCase", () => {
    let updateActiveUseCase: UpdateActiveUseCase;
    let statusRepositoryMock: StatusRepositoryMock;
    let statusValidatorMock: StatusValidatorMock;
    let loggerMock: LoggerMock;
    const statusPayloadMock: StatusPayload = StatusPayload.createMock();
    const input: UpdateActiveDTO = {
        id: statusPayloadMock.id.toString(),
        active: false
    };

    beforeEach(async () => {
        statusRepositoryMock = new StatusRepositoryMock();
        statusValidatorMock = new StatusValidatorMock();
        loggerMock = new LoggerMock();

        updateActiveUseCase = new UpdateActiveUseCase(statusRepositoryMock.mock,statusValidatorMock.mock,loggerMock.mock);
        await statusRepositoryMock.withTransaction();
    })

    afterEach(async () => {
        jest.clearAllMocks();
    })

    it("should update deactivate status", async () => {
        const stringUtilsSTN = jest.spyOn(StringUtils, "strToNumber");
        const stringUtilsTCLWA = jest.spyOn(StringUtils, "transformCapitalLetterWithoutAccent");


        statusValidatorMock.withValidateExistingStatus();
        statusRepositoryMock.withUpdateActive();

        const updatedActive: Result<UpdateActiveResponseDTO> = await updateActiveUseCase.execute(input);
        const resultValues: UpdateActiveResponseDTO = updatedActive.getValue();

        expect(loggerMock.logInfo).toHaveBeenCalledTimes(1);
        expect(stringUtilsSTN).toHaveBeenCalledTimes(1);
        expect(stringUtilsTCLWA).toHaveBeenCalledTimes(1);
        expect(statusRepositoryMock.commit).toHaveBeenCalledTimes(1);
        expect(resultValues.message).toEqual(Messages.Status.Success.DEACTIVATED);
    })

    it("should update activate status", async () => {
        const stringUtilsSTN = jest.spyOn(StringUtils, "strToNumber");
        const stringUtilsTCLWA = jest.spyOn(StringUtils, "transformCapitalLetterWithoutAccent");

        const inputActivate: UpdateActiveDTO = {
            id: statusPayloadMock.id.toString(),
            active: true
        };

        statusValidatorMock.withValidateExistingStatus();
        statusRepositoryMock.withUpdateActive();

        const updatedActive: Result<UpdateActiveResponseDTO> = await updateActiveUseCase.execute(inputActivate);
        const resultValues: UpdateActiveResponseDTO = updatedActive.getValue();

        expect(loggerMock.logInfo).toHaveBeenCalledTimes(1);
        expect(stringUtilsSTN).toHaveBeenCalledTimes(1);
        expect(stringUtilsTCLWA).toHaveBeenCalledTimes(1);
        expect(statusRepositoryMock.commit).toHaveBeenCalledTimes(1);
        expect(resultValues.message).toEqual(Messages.Status.Success.ACTIVATED);
    })

    it("should throw error when trying to update a status active with invalid id", async () => {
        statusValidatorMock.withValidateExistingStatus();
        statusRepositoryMock.withUpdateActiveError(Messages.Status.Error.UPDATED_FAILED);

        await expect(updateActiveUseCase.execute(input)).rejects.toThrow(
            new UseCaseError("UpdateActiveUseCase", Messages.Status.Error.UPDATED_FAILED)
        );

        expect(loggerMock.logError).toHaveBeenCalledTimes(1);
        expect(statusRepositoryMock.rollback).toHaveBeenCalledTimes(1);
    });

    it("should throw UseCaseError with UPDATED_FAILED message when error is not an instance of Error", async () => {
        statusValidatorMock.withValidateExistingStatus();
        statusRepositoryMock.mock.updateActive.mockRejectedValue(Messages.Status.Error.UPDATED_FAILED);

        await expect(updateActiveUseCase.execute(input)).rejects.toThrow(Messages.Status.Error.UPDATED_FAILED);

        expect(loggerMock.logError).toHaveBeenCalled();
        expect(statusRepositoryMock.rollback).toHaveBeenCalledTimes(1);
    });
})