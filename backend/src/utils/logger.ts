import fs from 'fs';
import * as path from 'path';
import { StatusCodes } from 'http-status-codes';
import { ILogger } from '../app/interface/utils/ILogger';

//constants
const logFilePath = path.join(__dirname, '../../LOGS/logs.txt');
const TEMPLATE_MESSAGE = 'Mensagem nao cadastrada';
const ERRO_DESCRIPTION = "ERRO";
const WAR_DESCRIPTION = "ATENÇÃO";
const SUCCESS_DESCRIPTION = "SUCESSO";
const INFO_DESCRIPTION = "INFO";

class Logger implements ILogger {
    private readonly dataBrasil = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
    constructor() {

    }
    logError(method: string, httpStatus: StatusCodes | null = null, error: Error): void {
        const logMessage = this.createLogMessage(ERRO_DESCRIPTION, method, httpStatus, error.message);
        this.#saveLog(logMessage);
    }

    logWarn(method: string, httpStatus: StatusCodes, message: string | null = null): void {
        message = message ? message : TEMPLATE_MESSAGE;
        const logMessage = this.createLogMessage(WAR_DESCRIPTION, method, httpStatus, message);
        this.#saveLog(logMessage);
    }

    logSuccess(method: string, httpStatus: StatusCodes, message: string | null = null): void {
        message = message ? message : TEMPLATE_MESSAGE;
        const logMessage = this.createLogMessage(SUCCESS_DESCRIPTION, method, httpStatus, message);
        this.#saveLog(logMessage);
    }

    logInfo(message: string, className: string | null, method: string): void { 
        const classNamePart = className ? ` ${className} -` : '';       
        const logMessage = `[${this.dataBrasil}] ${message}${className} - ${method} \n`;
        this.#saveLog(logMessage);
    }

    private createLogMessage(messageType: string, method: string, httpStatus: StatusCodes | null = null, message: string): string {
        const statusPart = httpStatus ? `StatusHttp: ${httpStatus.toString()} - ` : '';
        const log = `[${this.dataBrasil}] ${messageType} - Method: ${method} - ${statusPart}Message: ${message}\n`;

        return log;
    }

    #saveLog(logMessage: string): void {
        try {
            fs.appendFileSync(logFilePath, logMessage);
        } catch (err) {
            console.error('Erro ao registrar no arquivo de log:', err);
        }
    }
}


export { Logger };