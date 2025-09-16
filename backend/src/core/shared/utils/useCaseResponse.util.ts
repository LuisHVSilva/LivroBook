import {ConflictError, DomainError, ValidationError, NotFoundError} from "@coreShared/errors/domain.error";
import {ResultType} from "@coreShared/types/result.type";
import {UseCaseError} from "@coreShared/errors/useCase.error";

export class UseCaseResponseUtil {
    static handleResultError<T>(error: unknown): ResultType<T> {
        const knownErrors = [
            ConflictError,
            DomainError,
            ValidationError,
            NotFoundError,
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
        ];

        for (const ErrType of knownErrors) {
            if (error instanceof ErrType) {
                throw new UseCaseError(error.message);
            }
        }

        throw new UseCaseError("Erro inesperado: " + String(error));
    }
}
