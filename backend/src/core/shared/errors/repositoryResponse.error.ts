import {ResultType} from "@coreShared/types/result.type";

export class RepositoryResponseError {
    static handleResultError<T>(error: unknown): ResultType<T> {
        return ResultType.failure(new Error("Erro inesperado: " + String(error)));
    }
}
