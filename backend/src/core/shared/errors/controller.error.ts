import { StatusCodes } from "http-status-codes";
import { Response} from "express";
import { ErrorMessages } from "@coreShared/messages/errorMessages";

export class ControllerError extends Error {
    static handleError(
        res: Response,
        statusCode: StatusCodes = StatusCodes.BAD_REQUEST,
    ): Response {
        let errorMessage: string = ErrorMessages.Internal.INTERNAL_ERROR;

        return res.status(statusCode).json({
            success: false,
            message: errorMessage,
        });
    }
}
