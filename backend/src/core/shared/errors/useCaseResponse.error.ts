import {ResultType} from "@coreShared/types/result.type";
import {
    ConflictError,
    DomainError,
    InactiveError,
    NotFoundError, UseCaseError,
    ValidationError
} from "@coreShared/errors/classes.error";


export class UseCaseResponseError {
    static handleResultError<T>(error: unknown): ResultType<T> {
        const knownErrors = [
            ConflictError,
            DomainError,
            ValidationError,
            NotFoundError,
            InactiveError,
        ];

        for (const ErrType of knownErrors) {
            if (error instanceof ErrType) {
                return ResultType.failure(error);
            }
        }

        return ResultType.failure(new Error("Erro inesperado: " + String(error)));
    }

    static throwError<T>(error: unknown): ResultType<T> {
        const knownErrors = [
            ConflictError,
            DomainError,
            ValidationError,
            NotFoundError,
            InactiveError,
        ];

        for (const ErrType of knownErrors) {
            if (error instanceof ErrType) {
                throw new UseCaseError(error.message);
            }
        }

        throw new UseCaseError("Erro inesperado: " + String(error));
    }
}
