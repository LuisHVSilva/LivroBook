import {ConflictError, DomainError, ValidationError, NotFoundError} from "@coreShared/errors/domain.error";
import {ResultType} from "@coreShared/types/result.type";

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
}
