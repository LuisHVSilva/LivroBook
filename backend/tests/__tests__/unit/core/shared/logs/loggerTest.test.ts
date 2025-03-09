import fs from 'fs';
import {Logger} from "@coreShared/logs/logger";
import {StatusCodes} from 'http-status-codes';
import {Messages} from "@coreShared/constants/messages";

jest.mock('fs', () => ({
    promises: {
        appendFile: jest.fn(),
        mkdir: jest.fn(),
    },
}));

const SAVE_LOG = 'saveLog';
const TEST_METHOD = 'testMethod';
const ERRO_SIMULADO = 'Erro simulado';
const AVISO = 'Aviso';
const MENSAGEM_TESTE = "Mensagem Teste";
const ERROR = "error";

describe('Logger', () => {
    let logger: Logger;

    beforeEach(() => {
        logger = new Logger();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("Private methods", () => {
        test('saveLog deve tratar erros ao salvar o log no arquivo', async () => {
            const erroSimulado = new Error(ERRO_SIMULADO);
            (fs.promises.appendFile as jest.Mock).mockRejectedValueOnce(erroSimulado);

            const consoleSpy = jest.spyOn(console, ERROR).mockImplementation(() => {})

            await logger[SAVE_LOG](MENSAGEM_TESTE);

            expect(consoleSpy).toHaveBeenCalledWith(Messages.Logger.Error.NOT_REGISTER, erroSimulado);

            consoleSpy.mockRestore();
        });

        test('ensureLogDirectoryExists deve tratar erros ao salvar o arquivo', async () => {
            const erroSimulado = new Error(ERRO_SIMULADO);
            (fs.promises.mkdir as jest.Mock).mockRejectedValueOnce(erroSimulado);
            const consoleSpy = jest.spyOn(console, ERROR).mockImplementation(() => {
            });

            await logger["ensureLogDirectoryExists"]();

            expect(consoleSpy).toHaveBeenCalledWith(Messages.Logger.Error.PATH_NOT_CREATED + ":", erroSimulado);
            consoleSpy.mockRestore();
        });
    });

    describe("logError", () => {
        test('logError deve chamar saveLog corretamente', async () => {
            const spy = jest.spyOn(logger as any, SAVE_LOG);
            await logger.logError(TEST_METHOD, new Error(ERRO_SIMULADO), StatusCodes.INTERNAL_SERVER_ERROR);

            expect(spy).toHaveBeenCalled();
        });

        test('deve chamar saveLog com mensagem genérica', async () => {
            const spy = jest.spyOn(logger as any, SAVE_LOG);
            await logger.logError(TEST_METHOD, new Error(ERRO_SIMULADO), StatusCodes.INTERNAL_SERVER_ERROR, "info");

            expect(spy).toHaveBeenCalled();
        });
    });

    describe("logWarn", () => {
        test('logWarn deve chamar saveLog corretamente', async () => {
            const spy = jest.spyOn(logger as any, SAVE_LOG);
            await logger.logWarn(TEST_METHOD, StatusCodes.NOT_FOUND, AVISO, MENSAGEM_TESTE);

            expect(spy).toHaveBeenCalled();
        });

        test('logWarn deve chamar saveLog corretamente', async () => {
            const spy = jest.spyOn(logger as any, SAVE_LOG);
            await logger.logWarn(TEST_METHOD, StatusCodes.NOT_FOUND, AVISO, undefined);

            expect(spy).toHaveBeenCalled();
        });
    });

    describe('logSuccess', () => {
        test('logSuccess deve chamar saveLog corretamente', async () => {
            const spy = jest.spyOn(logger as any, SAVE_LOG);
            await logger.logSuccess(TEST_METHOD, StatusCodes.OK, MENSAGEM_TESTE);

            expect(spy).toHaveBeenCalled();
        });
    });

    describe("logInfo", () => {
        test('logInfo deve chamar saveLog corretamente', async () => {
            const spy = jest.spyOn(logger as any, SAVE_LOG);
            await logger.logInfo(MENSAGEM_TESTE, 'LoggerClass', TEST_METHOD);

            expect(spy).toHaveBeenCalled();
        });

        test('logInfo deve chamar saveLog corretamente', async () => {
            const spy = jest.spyOn(logger as any, SAVE_LOG);
            await logger.logInfo(MENSAGEM_TESTE, null, TEST_METHOD);

            expect(spy).toHaveBeenCalled();
        });
    });
});