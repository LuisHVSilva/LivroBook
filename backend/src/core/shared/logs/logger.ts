import fs from "fs";
import * as path from "path";
import {StatusCodes} from "http-status-codes";
import {ILogger} from "./ILogger";
import {Messages} from "@coreShared/constants/messages";

// Constants
const ERROR_DESCRIPTION = "ERROR";
const WARN_DESCRIPTION = "WARNING";
const INFO_DESCRIPTION = "INFO";

class Logger implements ILogger {
    constructor() {
        this.ensureLogDirectoryExists()
            .then(() => console.log("📂 Log directory is ready."))
            .catch((err) => console.error(Messages.Logger.Error.ENSURE_LOG_DIRECTORY, err));
    }

    private getCurrentTimestamp(): string {
        return new Date().toLocaleString("pt-BR", {timeZone: "America/Sao_Paulo"});
    }

    private getLogFilePath(): string {
        const date = new Date().toISOString().split("T")[0].replace(/-/g, "");
        const fileName = `${date}.log`;
        return path.join(__dirname, "../../../../LOGS/", fileName);
    }

    private createLogMessage(
        level: string,
        className: string,
        method: string,
        message: string,
        httpStatus?: StatusCodes,
        info?: any
    ): string {
        const timestamp = this.getCurrentTimestamp();
        const statusPart = httpStatus ? `Status: ${httpStatus} - ` : "";
        const infoPart = info ? `Info: ${JSON.stringify(info)} - ` : "";
        return `[${timestamp}] ${level} | Class: ${className} | Method: ${method} | ${statusPart}${infoPart}Message: ${message}\n`;
    }

    private async saveLog(logMessage: string): Promise<void> {
        try {
            await fs.promises.appendFile(this.getLogFilePath(), logMessage);
        } catch (err) {
            console.error(Messages.Logger.Error.LOG_WRITE_FAILED, err);
        }
    }

    private async ensureLogDirectoryExists(): Promise<void> {
        const logDir = path.dirname(this.getLogFilePath());
        try {
            await fs.promises.mkdir(logDir, {recursive: true});
        } catch (err) {
            console.error(Messages.Logger.Error.DIRECTORY_CREATION_FAILED, err);
        }
    }

    async logError(className: string, method: string, error: Error, httpStatus?: StatusCodes, info?: any): Promise<void> {
        const message = `Error: ${error.message}\nStack: ${error.stack}`;
        const logMessage = this.createLogMessage(ERROR_DESCRIPTION, className, method, message, httpStatus, info);
        await this.saveLog(logMessage);
    }

    async logWarn(className: string, method: string, message: string, httpStatus?: StatusCodes, info?: any): Promise<void> {
        const logMessage = this.createLogMessage(WARN_DESCRIPTION, className, method, message, httpStatus, info);
        await this.saveLog(logMessage);
    }

    async logInfo(className: string, method: string, message: string, httpStatus?: StatusCodes, info?: any): Promise<void> {
        const logMessage = this.createLogMessage(INFO_DESCRIPTION, className, method, message, httpStatus, info);
        await this.saveLog(logMessage);
    }
}

export {Logger};
