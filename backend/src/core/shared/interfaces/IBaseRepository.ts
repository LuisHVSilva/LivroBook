import {Result} from "@coreShared/types/Result";
import {Transaction} from "sequelize";

export interface IBaseRepository<T, E> {
    startTransaction(): Promise<Transaction>;

    /**
     * Create a new register.
     *
     * @param entity - The T entity.
     * @returns A T object created.
     */
    create(entity: T): Promise<Result<T, E>>;

    /**
     * Search for a T by its ID.
     *
     * @param id - The T ID to fetch.
     * @returns A T object if found.
     */
    findById(id: number): Promise<Result<T, E>>;

    // findAll(): Promise<Result<T[]>>;
    // updateById(id: string, entity: Partial<T>): Promise<Result<T>>;
    // deleteById(id: string): Promise<Result<void>>;
    // countByDescription(description: string): Promise<Result<number>>;
    // existsById(id: string): Promise<Result<boolean>>;
}