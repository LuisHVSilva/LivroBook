import {Attributes, ModelAttributes, Transaction} from "sequelize";
import {ResultType} from "@coreShared/types/result.type";
import {FindAllType} from "@coreShared/types/findAll.type";
import {BaseRepositoryType} from "@coreShared/types/entity.type";

export interface IRepositoryBase<T extends BaseRepositoryType<any, any, any, any, any>> {
    /**
     * Create a new register.
     * @param entity - The T entity to create.
     * @param transaction - Optional transaction for database operations.
     * @returns A T object created.
     */
    create(entity: T["Entity"], transaction?: Transaction): Promise<ResultType<T["Entity"]>>;

    /**
     * Finds a single entity by its ID.
     * @param id - Entity identifier.
     * @param transaction
     * @param includes
     */
    findById(id: number, transaction?: Transaction, includes?: boolean): Promise<ResultType<T["Entity"]>>;

    /**
     * Finds a single entity by filter.
     * @param filter - Filter criteria to apply when searching for entity.
     * @param exact - Exact match filter. Default is true.
     * @param includes
     * @param transaction
     */
    findOneByFilter(filter: T["Filter"], exact?: boolean, includes?: boolean, transaction?: Transaction): Promise<ResultType<T["Entity"]>>;

    /**
     * @param limit - The maximum number of statuses to return.
     * @param offset - The number of statuses to skip before starting to collect the result set.
     * @param filters - Optional filter criteria to apply when searching for entity.
     * @param orderBy -
     * @param exact - Exact match filter. Default is true.
     * @param includes
     * @return A ResultType containing an array of StatusEntity objects and the total count of matching statuses.
     */
    findMany(
        limit: number,
        offset: number,
        filters?: T["Filter"],
        orderBy?: { field: keyof T["Entity"]; direction: 'ASC' | 'DESC' },
        exact?: boolean,
        includes?: boolean
    ): Promise<ResultType<FindAllType<T["Entity"]>>>

    /**
     * Update a status entity.
     *
     * @param entity - The StatusEntity to be updated.
     * @param transaction - Optional transaction for database operations.
     * @returns A ResultType containing the updated StatusEntity.
     */
    update(entity: T["Entity"], transaction?: Transaction): Promise<ResultType<T["Entity"]>>;

    /**
     * Retrieves metadata about the model's attributes.
     *
     * Each attribute includes its column definition as defined in Sequelize,
     * such as data type, primary key, nullability, and constraints.
     *
     * @returns A Promise that resolves to the model's attributes metadata,
     *          where each key corresponds to a column name and its value
     *          contains the attribute definition (type, allowNull, etc.).
     */
    getMetadata():  Promise<ModelAttributes<T["Model"], Attributes<T["Model"]>>> ;
}