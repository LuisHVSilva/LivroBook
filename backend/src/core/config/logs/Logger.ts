import fs from "fs";
import * as path from "path";
import {StatusCodes} from "http-status-codes";
import {ILogger} from "./ILogger";
import {LoggerMessages} from "@coreShared/messages/loggerMessages";
import {LoggerContext} from "@coreConfig/logs/LoggerContext";
import {LogFormatter} from "@coreConfig/logs/LogFormatter";
import * as dotenv from "dotenv";

dotenv.config({path: path.resolve(__dirname, '../../../../.env')});

// Constants
const ERROR_DESCRIPTION = "ERROR";
const WARN_DESCRIPTION = "WARNING";
const INFO_DESCRIPTION = "INFO";
const LOG_FOLDER = process.env.LOG_FOLDER ?? path.join(__dirname, "../../../../LOGS/");

class Logger implements ILogger {
    private readonly _logFormatter: LogFormatter = new LogFormatter();
    private readonly logFilePath: string;

    constructor() {
        this.logFilePath = this.getLogFilePath();
        this.onStart();
    }

    private getLogFilePath(): string {
        const date = new Date().toISOString().split("T")[0].replace(/-/g, "");
        const fileName = `${date}.log`;
        return path.join(LOG_FOLDER, fileName);
    }

    private onStart(): void {
        this.ensureLogDirectoryExists()
            .then(() => console.log("📂 Log directory is ready."))
            .catch((err) => console.error(LoggerMessages.Error.ENSURE_LOG_DIRECTORY, err));
    }

    private async saveLog(logMessage: string): Promise<void> {
        try {
            await fs.promises.appendFile(this.logFilePath, logMessage);
        } catch (err) {
            console.error(LoggerMessages.Error.LOG_WRITE_FAILED, err);
        }
    }

    private async ensureLogDirectoryExists(): Promise<void> {
        try {
            await fs.promises.mkdir(path.dirname(this.logFilePath), { recursive: true });
        } catch (err) {
            console.error(LoggerMessages.Error.DIRECTORY_CREATION_FAILED, err);
        }
    }


    async logError(context: LoggerContext, message: string, stack?: string, info?: any,
                   httpStatus?: StatusCodes): Promise<void> {
        let fullMessage: string = `Error: ${message}`;
        if (stack) {
            fullMessage += `\nStack Trace: ${stack}`;
        }
        const logMessage: string = this._logFormatter.format(ERROR_DESCRIPTION, context.className,
            context.method, fullMessage, httpStatus, info);
        await this.saveLog(logMessage);
    }

    async logException(context: LoggerContext, error: Error, info?: any, httpStatus?: StatusCodes): Promise<void> {
        await this.logError(context, error.message, error.stack, info, httpStatus);
    }

    async logWarn(context: LoggerContext, message: string, httpStatus?: StatusCodes, info?: any): Promise<void> {
        const logMessage: string = this._logFormatter.format(WARN_DESCRIPTION, context.className,
            context.method, message, httpStatus, info);
        await this.saveLog(logMessage);
    }

    async logInfo(context: LoggerContext, message: string, httpStatus?: StatusCodes, info?: any): Promise<void> {
        const logMessage: string = this._logFormatter.format(INFO_DESCRIPTION, context.className,
            context.method, message, httpStatus, info);
        await this.saveLog(logMessage);
    }
}

export {Logger};
