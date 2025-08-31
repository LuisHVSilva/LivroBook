import {Transaction} from "sequelize";
import {ResultType} from "@coreShared/types/result.type";
import {FindAllType} from "@coreShared/types/findAll.type";

export interface IBaseRepository<TEntity, TFilter> {
    /**
     * Create a new register.
     * @param entity - The T entity to create.
     * @param transaction - Optional transaction for database operations.
     * @returns A T object created.
     */
    create(entity: TEntity, transaction?: Transaction): Promise<ResultType<TEntity>>;

    /**
     * @param limit - The maximum number of statuses to return.
     * @param offset - The number of statuses to skip before starting to collect the result set.
     * @param filter - Optional filter criteria to apply when searching for entity.
     * @param orderBy -
     * @return A ResultType containing an array of StatusEntity objects and the total count of matching statuses.
     */
    findMany(
        limit: number,
        offset: number,
        filter?: TFilter,
        orderBy?: { field: keyof TEntity; direction: 'ASC' | 'DESC' }
    ): Promise<ResultType<FindAllType<TEntity>>>;

    /**
     * Finds a single entity by its ID.
     * @param id - Entity identifier.
     */
    findById(id: string | number): Promise<ResultType<TEntity>>;

    /**
     * Finds a single entity by filter.
     * @param filter - Filter criteria to apply when searching for entity.
     */
    findOneByFilter(filter: TFilter): Promise<ResultType<TEntity>>;

    /**
     * Update a status entity.
     *
     * @param entity - The StatusEntity to be updated.
     * @param transaction - Optional transaction for database operations.
     * @returns A ResultType containing the updated StatusEntity.
     */
    update(entity: TEntity, transaction?: Transaction): Promise<ResultType<TEntity>>;
}