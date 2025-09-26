import type {ResponseErrorType} from "../types/http.type.ts";
import {AppError, ConflictError, ValidationError} from "../../errors/generic.error.ts";
import {errorMessage} from "../../constants/messages/error.message.ts";
import {HttpStatusCode} from "axios";
import {t} from "../../constants/messages/translations.ts";

class HandleHttpResponse {
    private handleBadRequest(data: ResponseErrorType): ValidationError {
        if (data.errors?.length) {
            return new ValidationError(data.errors.join("\n"));
        }
        return new ValidationError(data.message ?? errorMessage.validationError.invalidDatas);
    }

    private handleUnauthorized(): AppError {
        return new AppError(t(errorMessage.appError.auth.sessionExpired), HttpStatusCode.Unauthorized);
    }

    private handleForbidden(data: ResponseErrorType) {
        return new AppError(data.message ?? t(errorMessage.appError.auth.unauthorizedUser), HttpStatusCode.Forbidden);
    }

    private handleConflict(data: ResponseErrorType) {
        const message: string = data.message ?? errorMessage.conflictError.generic;
        return new ConflictError(message);
    }

    private handleInternalServerError(data: ResponseErrorType) {
        const message: string = data.message ?? errorMessage.serviceError.internalServerError
        return new AppError(message, HttpStatusCode.InternalServerError)
    }

    mapHttpError(status: number, data: ResponseErrorType): Error {
        switch (status) {
            case HttpStatusCode.BadRequest:
                return this.handleBadRequest(data);
            case HttpStatusCode.Unauthorized:
                return this.handleUnauthorized();
            case HttpStatusCode.Forbidden:
                return this.handleForbidden(data);
            case HttpStatusCode.Conflict:
                return this.handleConflict(data);
            case HttpStatusCode.InternalServerError:
                return this.handleInternalServerError(data);
            default:
                return new AppError(data.message ?? errorMessage.serviceError.internalServerError, status);
        }
    }
}

export const handleHttpResponse = new HandleHttpResponse();
