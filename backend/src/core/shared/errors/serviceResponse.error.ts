import {ResultType} from "@coreShared/types/result.type";
import {
    ConflictError,
    DomainError,
    InactiveError,
    NotFoundError, RepositoryError,
    ValidationError
} from "@coreShared/errors/classes.error";


export class ServiceResponseError {
    private static knownErrors = [
        ConflictError,
        DomainError,
        ValidationError,
        NotFoundError,
        InactiveError,
        RepositoryError
    ];

    static handleResultError<T>(error: unknown): ResultType<T> {
        for (const ErrType of ServiceResponseError.knownErrors) {
            if (error instanceof ErrType) {
                return ResultType.failure(error);
            }
        }

        return ResultType.failure(new Error("Erro inesperado: " + String(error)));
    }
}
