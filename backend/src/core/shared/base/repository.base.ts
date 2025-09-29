import {IRepositoryBase} from "@coreShared/base/interfaces/IRepositoryBase";
import {BaseRepositoryType} from "@coreShared/types/entity.type";
import {
    Attributes,
    FindOptions,
    ModelAttributes,
    ModelStatic,
    Transaction,
    WhereOptions
} from "sequelize";
import {ResultType} from "@coreShared/types/result.type";
import {FindAllType} from "@coreShared/types/findAll.type";
import {SequelizeWhereBuilderUtil} from "@coreShared/utils/sequelizeWhereBuilder.util";

export abstract class RepositoryBase<T extends BaseRepositoryType<any, any, any, any>> implements IRepositoryBase<T> {

    protected constructor(
        private readonly model: ModelStatic<T["Model"]>,
    ) {
    }

    async create(entity: T["Entity"], transaction?: Transaction): Promise<ResultType<T["Entity"]>> {
        const data: T["Persistence"] = this.toPersistence(entity);
        const created: T["Model"] = await this.model.create(data, {transaction}) as T["Model"];
        const restored: T["Entity"] = this.toEntity(created);

        return ResultType.success(restored);
    }

    async findById(id: number): Promise<ResultType<T["Entity"]>> {
        const model: T["Model"] | null = await this.model.findByPk(id);
        return model ? ResultType.success(this.toEntity(model)) : ResultType.none();
    }

    async findOneByFilter(filter?: T["Filter"]): Promise<ResultType<T["Entity"]>> {
        const where: WhereOptions = this.makeFilter(filter).build()

        const model: T["Model"] | null = await this.model.findOne({where}) as T["Model"];
        return model ? ResultType.success(this.toEntity(model)) : ResultType.none();
    }

    async findOneExactByFilter(filter?: T["Filter"]): Promise<ResultType<T["Entity"]>> {
        const where: WhereOptions = this.makeExactFilter(filter).build()

        const model: T["Model"] | null = await this.model.findOne({where}) as T["Model"];
        return model ? ResultType.success(this.toEntity(model)) : ResultType.none();
    }

    async findMany(
        limit: number,
        offset: number,
        filters?: T["Filter"],
        orderBy?: { field: keyof T["Entity"]; direction: 'ASC' | 'DESC' }
    ): Promise<ResultType<FindAllType<T["Entity"]>>> {
        const where: WhereOptions = this.makeFilter(filters).build();

        const optionsFilter: FindOptions = {
            where,
            limit,
            offset
        }

        if (orderBy) {
            optionsFilter.order = [[orderBy.field as string, orderBy.direction]];
        }

        const models: T["Model"][] = await this.model.findAll(optionsFilter) as T["Model"][]
        const total: number = models.length

        const entities: T["Entity"][] = models.map(model => this.toEntity(model))

        return ResultType.success({entities: entities, total: total});
    }

    async update(entity: T["Entity"], transaction?: Transaction): Promise<ResultType<T["Entity"]>> {
        const modelToUpdate: T["Model"] | null = await this.model.findByPk(entity.id, { transaction }) as T["Model"];

        if (!modelToUpdate) {
            return ResultType.failure(new Error("Entity not found"));
        }

        const persistenceData: T["Persistence"] = this.toPersistence(entity);
        await modelToUpdate.update(persistenceData, { transaction });
        await modelToUpdate.reload({ transaction });

        const updatedEntity: T["Entity"] = this.toEntity(modelToUpdate);

        return ResultType.success(updatedEntity);
    }

    async getMetadata(): Promise<ModelAttributes<T["Model"], Attributes<T["Model"]>>> {
        return this.model.getAttributes();
    }


    protected makeFilter(filters?: T["Filter"], config?: Partial<Record<keyof T["Filter"], {
        in?: boolean ;
        like?: boolean
    }>>): SequelizeWhereBuilderUtil<T["Filter"]> {
        const where: Partial<Record<keyof T["Filter"], any>> = {};

        if (filters) {
            Object.entries(filters).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    where[key as keyof T["Filter"]] = value;
                }
            });
        }

        return new SequelizeWhereBuilderUtil<T["Filter"]>(filters, config);
    };

    protected abstract toPersistence(entity: T["Entity"]): T["Persistence"]

    protected abstract toEntity(model: T["Model"]): T["Entity"];

    private makeExactFilter(filters?: T["Filter"]): SequelizeWhereBuilderUtil<T["Filter"]> {
        const where: Partial<Record<keyof T["Filter"], any>> = {};

        if (filters) {
            Object.entries(filters).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    where[key as keyof T["Filter"]] = value;
                }
            });
        }

        return new SequelizeWhereBuilderUtil<T["Filter"]>(filters);
    };
}