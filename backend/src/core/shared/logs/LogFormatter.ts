import {StatusCodes} from "http-status-codes";
import util from "util";

export class LogFormatter {
    private getCurrentTimestamp(): string {
        return new Date().toLocaleString("pt-BR", {timeZone: "America/Sao_Paulo"});
    }

    /**
     * Formats a log message with the given parameters.
     *
     * @param level - Log level (e.g., ERROR, WARN, INFO).
     * @param className - Name of the class where the log is generated.
     * @param method - Name of the method where the log is generated.
     * @param message - The log message.
     * @param httpStatus - Optional HTTP status code.
     * @param info - Optional additional information to include in the log.
     * @returns A formatted log string.
     */
    public format(level: string, className: string, method: string, message: string,
                  httpStatus?: StatusCodes, info?: any): string {
        const statusPart = httpStatus ? `Status: ${httpStatus} - ` : "";
        const infoPart = info ? `Info: ${util.inspect(info, { depth: null })} - ` : "";
        return `[${this.getCurrentTimestamp()}] ${level} | Class: ${className} | Method: ${method} | 
        ${statusPart}${infoPart}Message: ${message}\n`;
    }
}
