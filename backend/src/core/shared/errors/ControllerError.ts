import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import {ILogger} from "@coreShared/logs/ILogger";
import { Messages } from "@coreShared/constants/messages";
import {UseCaseError} from "@coreShared/errors/UseCaseError";

export class ControllerError extends Error {
    static async handleError(
        logger: ILogger,
        className: string,
        method: string,
        error: unknown,
        res: Response,
        statusCode: StatusCodes = StatusCodes.BAD_REQUEST,
        extraInfo?: any
    ): Promise<Response> {
        let errorMessage: string;

        if (error instanceof Error || error instanceof UseCaseError) {
            errorMessage = error.message;
        } else {
            statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
            errorMessage = Messages.Generic.INTERNAL_ERROR;
        }

        try {
            logger.logError(className, method, error as Error, statusCode, extraInfo);
        } catch (logError) {
            console.error("Erro ao registrar log:", logError);
        }

        return res.status(statusCode).json({
            success: false,
            message: errorMessage
        });
    }
}
