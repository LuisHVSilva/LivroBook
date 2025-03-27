import fs from 'fs';
import {Logger} from "@coreShared/logs/logger";
import {StatusCodes} from 'http-status-codes';
import {Messages} from "@coreShared/messages/messages";
import SpyInstance = jest.SpyInstance;

jest.mock('fs', () => ({
    promises: {
        appendFile: jest.fn(),
        mkdir: jest.fn(),
    },
}));

const SAVE_LOG = 'saveLog';
const TEST_METHOD = 'testMethod';
const ERRO_SIMULADO = 'Erro simulado';
const INFO = 'Info';
const TEST_MESSAGE = "Mensagem Teste";
const ERROR = "error";
const CLASS_NAME = "class name";

describe('Logger', () => {
    let logger: Logger;

    beforeEach(() => {
        logger = new Logger();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("Private methods", () => {
        it('saveLog deve tratar erros ao salvar o log no arquivo', async () => {
            const erroSimulado = new Error(ERRO_SIMULADO);
            (fs.promises.appendFile as jest.Mock).mockRejectedValueOnce(erroSimulado);

            const consoleSpy: SpyInstance = jest.spyOn(console, ERROR).mockImplementation(() => {
            })

            await logger[SAVE_LOG](TEST_MESSAGE);

            expect(consoleSpy).toHaveBeenCalledWith(Messages.Logger.Error.LOG_WRITE_FAILED, erroSimulado);

            consoleSpy.mockRestore();
        });

        it('ensureLogDirectoryExists deve tratar erros ao salvar o arquivo', async () => {
            const erroSimulado = new Error(ERRO_SIMULADO);
            (fs.promises.mkdir as jest.Mock).mockRejectedValueOnce(erroSimulado);
            const consoleSpy: SpyInstance = jest.spyOn(console, ERROR).mockImplementation(() => {
            });

            await logger["ensureLogDirectoryExists"]();

            expect(consoleSpy).toHaveBeenCalledWith(Messages.Logger.Error.DIRECTORY_CREATION_FAILED, erroSimulado);
            consoleSpy.mockRestore();
        });

        it("should log error message when ensureLogDirectoryExists rejects", async () => {
            const mockError = new Error("Test error");
            const ensureLogDirectoryExistsMock = jest.spyOn(Logger.prototype as any,
                "ensureLogDirectoryExists");
            ensureLogDirectoryExistsMock.mockRejectedValue(mockError);
            const consoleErrorMock = jest.spyOn(console, "error").mockImplementation();

            new Logger();

            await new Promise(setImmediate); // Aguarda a execução do Promise.catch()

            expect(consoleErrorMock).toHaveBeenCalledWith("❌ Error ensuring log directory:", mockError);

            consoleErrorMock.mockRestore();
        });
    });

    describe("logError", () => {
        it('logError deve chamar saveLog corretamente', async () => {
            const spy: SpyInstance = jest.spyOn(logger as any, SAVE_LOG);
            await logger.logError(
                CLASS_NAME,
                TEST_METHOD,
                new Error(ERRO_SIMULADO),
                StatusCodes.INTERNAL_SERVER_ERROR
            );

            expect(spy).toHaveBeenCalled();
        });

        it('deve chamar saveLog com mensagem genérica', async () => {
            const spy: SpyInstance = jest.spyOn(logger as any, SAVE_LOG);
            await logger.logError(
                CLASS_NAME,
                TEST_METHOD,
                new Error(ERRO_SIMULADO),
                StatusCodes.INTERNAL_SERVER_ERROR,
                "info"
            );

            expect(spy).toHaveBeenCalled();
        });
    });

    describe("logWarn", () => {
        it('logWarn deve chamar saveLog corretamente', async () => {
            const spy: SpyInstance = jest.spyOn(logger as any, SAVE_LOG);
            await logger.logWarn(
                CLASS_NAME,
                TEST_METHOD,
                TEST_MESSAGE,
                StatusCodes.NOT_FOUND,
                INFO,
            );

            expect(spy).toHaveBeenCalled();
        });

        it('logWarn deve chamar saveLog corretamente', async () => {
            const spy: SpyInstance = jest.spyOn(logger as any, SAVE_LOG);
            await logger.logWarn(
                CLASS_NAME,
                TEST_METHOD,
                TEST_MESSAGE,
                StatusCodes.NOT_FOUND
            );

            expect(spy).toHaveBeenCalled();
        });
    });

    describe("logInfo", () => {
        it('logInfo deve chamar saveLog completo corretamente', async () => {
            const spy: SpyInstance = jest.spyOn(logger as any, SAVE_LOG);
            await logger.logInfo(
                CLASS_NAME,
                TEST_METHOD,
                TEST_MESSAGE,
                StatusCodes.OK,
                INFO
            );

            expect(spy).toHaveBeenCalled();
        });

        it('logInfo deve chamar saveLog sem a entrada info', async () => {
            const spy: SpyInstance = jest.spyOn(logger as any, SAVE_LOG);
            await logger.logInfo(
                CLASS_NAME,
                TEST_METHOD,
                TEST_MESSAGE,
                StatusCodes.OK
            );

            expect(spy).toHaveBeenCalled();
        });

        it('logInfo deve chamar saveLog sem a entrada httpStatus e info', async () => {
            const spy: SpyInstance = jest.spyOn(logger as any, SAVE_LOG);
            await logger.logInfo(
                CLASS_NAME,
                TEST_METHOD,
                TEST_MESSAGE
            );

            expect(spy).toHaveBeenCalled();
        });
    });
});