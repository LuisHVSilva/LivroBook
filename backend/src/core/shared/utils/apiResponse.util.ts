import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import {ConflictError, DomainError, NotFoundError, ValidationError} from "../errors/domain.error";
import { ControllerError } from "../errors/controller.error";

export class ApiResponseUtil {
    static success<T>(res: Response, data: T, status: number = StatusCodes.OK): Response {
        return res.status(status).json({ success: true, data });
    }

    static error(res: Response, message: string, status: number = StatusCodes.BAD_REQUEST): Response {
        return res.status(status).json({ success: false, message });
    }

    static notFound(res: Response, message: string): Response {
        return this.error(res, message, StatusCodes.NOT_FOUND);
    }

    static handleResultError(res: Response, error: unknown): Response {
        if (error instanceof ConflictError) {
            return this.error(res, error.message, StatusCodes.CONFLICT);
        }

        if (error instanceof DomainError) {
            return this.error(res, error.message, StatusCodes.BAD_REQUEST);
        }

        if (error instanceof ValidationError) {
            return this.error(res, error.message, StatusCodes.BAD_REQUEST);
        }

        if (error instanceof NotFoundError) {
            return this.error(res, error.message, StatusCodes.NOT_FOUND);
        }

        return ControllerError.handleError(res, StatusCodes.INTERNAL_SERVER_ERROR);
    }

}
