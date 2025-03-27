import { StatusCodes } from "http-status-codes";

export interface ILogger {
    /**
     * Logs an error message.
     *
     * @param className - Name of the class associated with the log.
     * @param method - Name of the method where the error occurred.
     * @param error - Captured error object.
     * @param httpStatus - HTTP status code, if applicable.
     * @param info - Additional context information.
     */
    logError(className: string, method: string, error: Error, info?: any, httpStatus?: StatusCodes): void;

    /**
     * Logs a warning message, useful for unexpected but non-critical events.
     *
     * @param className - Name of the class associated with the log.
     * @param method - Name of the method where the warning occurred.
     * @param message - Descriptive warning message.
     * @param httpStatus - HTTP status code, if applicable.
     * @param info - Additional context information.
     */
    logWarn(className: string, method: string, message: string, httpStatus?: StatusCodes, info?: any): void;

    /**
     * Logs an informational message, including success logs.
     *
     * @param className - Name of the class associated with the log.
     * @param method - Name of the method where the event occurred.
     * @param message - Informational or success message.
     * @param httpStatus - HTTP status code, if applicable.
     * @param info - Additional context information.
     */
    logInfo(className: string, method: string, message: string, httpStatus?: StatusCodes, info?: any): void;
}
