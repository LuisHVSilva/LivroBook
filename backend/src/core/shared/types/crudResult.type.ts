export interface CreateResultType<T> {
    entity: T;
    created: boolean;
}

export interface UpdateResultType<T> {
    entity: T;
    updated: boolean;
}