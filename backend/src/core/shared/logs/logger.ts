import fs from 'fs';
import * as path from 'path';
import {StatusCodes} from 'http-status-codes';
import {ILogger} from './ILogger';

// Constants
const logFilePath = path.join(__dirname, '../../../LOGS/logs.txt');
const TEMPLATE_MESSAGE = 'Mensagem não cadastrada';
const ERRO_DESCRIPTION = "ERRO";
const WAR_DESCRIPTION = "ATENÇÃO";
const SUCCESS_DESCRIPTION = "SUCESSO";
const INFO_DESCRIPTION = "INFO";

class Logger implements ILogger {
    constructor() {
        this.ensureLogDirectoryExists().then(() => console.log("Diretório de logs pronto."));
    }

    private getCurrentTimestamp(): string {
        return new Date().toLocaleString("pt-BR", {timeZone: "America/Sao_Paulo"});
    }

    async logError(method: string, error: Error, httpStatus?: StatusCodes, info?: any): Promise<void> {
        const messagePart = info ? `Informação adicional: ${info} -` : '';
        const message = messagePart + ' ' + error;
        const logMessage = this.createLogMessage(ERRO_DESCRIPTION, method, httpStatus, message);
        await this.saveLog(logMessage);
    }

    async logWarn(method: string, httpStatus?: StatusCodes, info?: string, message?: string): Promise<void> {
        message = message || TEMPLATE_MESSAGE;
        const logMessage = this.createLogMessage(WAR_DESCRIPTION, method, httpStatus, message);
        await this.saveLog(logMessage);
    }

    async logSuccess(method: string, httpStatus: StatusCodes, message: string): Promise<void> {
        message = message || TEMPLATE_MESSAGE;
        const logMessage = this.createLogMessage(SUCCESS_DESCRIPTION, method, httpStatus, message);
        await this.saveLog(logMessage);
    }

    async logInfo(message: string, className: string | null, method: string): Promise<void> {
        const classNamePart = className ? `Class: ${className} - ` : '';
        const logMessage = this.createLogMessage(INFO_DESCRIPTION, method, undefined, `${classNamePart}${message}`);
        await this.saveLog(logMessage);
    }

    private createLogMessage(messageType: string, method: string, httpStatus?: StatusCodes, message?: string): string {
        const statusPart = httpStatus ? `StatusHttp: ${httpStatus.toString()} - ` : '';
        return `[${this.getCurrentTimestamp()}] ${messageType} - Method: ${method} - ${statusPart}Message: ${message}\n`;
    }

    private async saveLog(logMessage: string): Promise<void> {
        try {
            await fs.promises.appendFile(logFilePath, logMessage);
        } catch (err) {
            console.error('Erro ao registrar no arquivo de log:', err);
        }
    }

    private async ensureLogDirectoryExists(): Promise<void> {
        const logDir = path.dirname(logFilePath);
        try {
            await fs.promises.mkdir(logDir, {recursive: true});
        } catch (err) {
            console.error('Erro ao criar diretório de logs:', err);
        }
    }
}

export {Logger};
