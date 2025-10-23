import {StatusCodes} from "http-status-codes";
import {Response} from "express";
import {ErrorMessages} from "@coreShared/messages/errorMessages";

//#region ENTITY
export class EntityError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "EntityError";
    }
}

//#endregion

//#region DOMAIN
export class DomainError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "DomainError";
    }
}

//#endregion

//#region REPOSITORY
export class RepositoryError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "DomainError";
    }
}

//#endregion

//#region SERVICE
export class ServiceError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ServiceError";
    }
}

//#endregion

//#region USE CASE
export class UseCaseError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "UseCaseError";
    }
}

//#endregion

//#region CONTROLLER
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

//#endregion

//#region GENERICS
export class ConflictError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ConflictError";
    }
}

export class NotFoundError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "NotFoundError";
    }
}

export class ValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ValidationError";
    }
}

export class InactiveError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "InactiveError";
    }
}

export class NullableError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "NullableError";
    }
}

//#endregion

