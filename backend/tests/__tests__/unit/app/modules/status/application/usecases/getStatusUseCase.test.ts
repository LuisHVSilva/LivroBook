import {GetStatusUseCase} from "@status/application/usecases/getStatusUseCase";
import {LoggerMock} from "@mocks/loggerMock";
import {StatusRepositoryMock} from "@mocks/statusRepositoryMock";
import {StatusPayload} from "@payloads/statusPayload";
import {Messages} from "@coreShared/constants/messages";
import {UseCaseError} from "@coreShared/errors/UseCaseError";

describe("getStatusUseCase", () => {
    let getStatusUseCase: GetStatusUseCase;
    let statusRepositoryMock: StatusRepositoryMock;
    let loggerMock: LoggerMock;
    const input = {id: StatusPayload.id.toString()};

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

        const result = await getStatusUseCase.execute(input);

        expect(loggerMock.logInfo).toHaveBeenCalled();
        expect(result).toBeDefined();
        expect(result).toStrictEqual(StatusPayload.statusLiteralObject())
    });

    it("should return null for not found Status id", async () => {
        statusRepositoryMock.withFindByIdNull();

        const result = await getStatusUseCase.execute(input);
        expect(loggerMock.logInfo).toHaveBeenCalled();
        expect(result).toBeNull();
    });

    it("should throw error when trying to find a status with invalid id", async () => {
        const errorMessage = "Generic Error";

        statusRepositoryMock.withFindByIdError(errorMessage);

        await expect(getStatusUseCase.execute(input)).rejects.toThrow(UseCaseError);
        await expect(getStatusUseCase.execute(input)).rejects.toThrow(errorMessage);

        expect(loggerMock.logError).toHaveBeenCalled();
    });

    it("should throw UseCaseError with NOT_FOUND message when error is not an instance of Error", async () => {
        statusRepositoryMock.mock.findById.mockRejectedValue(Messages.Status.Error.NOT_FOUND);

        await expect(getStatusUseCase.execute(input)).rejects.toThrow(UseCaseError);
        await expect(getStatusUseCase.execute(input)).rejects.toThrow(Messages.Status.Error.NOT_FOUND);

        expect(loggerMock.logError).toHaveBeenCalled();
    });

});
