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
import {EntitiesMessage} from "@coreShared/messages/entities.message";
import {RelationMapType} from "@coreShared/types/controller.type";
import {IStatusRepository} from "@status/infrastructure/repositories/IStatusRepository";
import {StatusEntity} from "@status/domain/entities/status.entity";
import {MakeNullishOptional} from "sequelize/lib/utils";
import {NotFoundError, NullableError, ValidationError} from "@coreShared/errors/classes.error";
import {RepositoryResponseError} from "@coreShared/errors/repositoryResponse.error";


export abstract class RepositoryBase<T extends BaseRepositoryType<any, any, any, any, any>> implements IRepositoryBase<T> {
    protected constructor(
        private readonly model: ModelStatic<T["Model"]>,
        protected readonly statusRepo?: IStatusRepository,
    ) {
    }

    protected abstract filter(): Partial<Record<keyof T["Filter"], { in?: boolean; like?: boolean }>> | undefined;

    protected abstract toEntity(model: T["Model"]): Promise<T["Entity"]>;

    protected abstract toPersistence(entity: T["Entity"], transaction?: Transaction): Promise<MakeNullishOptional<T["Model"]["_creationAttributes"]>>;

    protected abstract associationMap(): Partial<Record<keyof T["Filter"], string>>


    async create(entity: T["Entity"], transaction?: Transaction): Promise<ResultType<T["Entity"]>> {
        try {
            const preparedData = await this.toPersistence(entity, transaction);

            const created: T["Model"] = await this.model.create(preparedData, {transaction}) as T["Model"];
            const entityCreated = await this.findById(created.id, transaction);

            if (entityCreated.isNone() || entityCreated.isFailure()) {
                return ResultType.failure(new NullableError(EntitiesMessage.error.failure.createGeneric));
            }

            return entityCreated;
        } catch (error) {
            return RepositoryResponseError.handleResultError(error);
        }
    }

    async findById(id: number, transaction?: Transaction, includes: boolean = true): Promise<ResultType<T["Entity"]>> {
        try {
            const model: T["Model"] | null = await this.model.findByPk(id, {
                transaction,
                include: includes ? this.getIncludes() : undefined,
                // logging: console.log,
            });
            // console.log(JSON.stringify(model?.toJSON(), null, 2));

            if (!model) {
                return ResultType.none();
            }

            const entity: Awaited<T["Entity"]> = await this.toEntity(model);

            return ResultType.success(entity);
        } catch (error) {
            return RepositoryResponseError.handleResultError(error);
        }
    }

    async findOneByFilter(filter?: T["Filter"], exact: boolean = true, includes: boolean = true, transaction?: Transaction): Promise<ResultType<T["Entity"]>> {
        try {
            const where: WhereOptions = this.makeFilter(filter, exact).build(this.associationMap());
            const model: T["Model"] | null = await this.model.findOne({
                where,
                include: includes ? this.getIncludes() : undefined,
                transaction
            });

            if (!model) {
                return ResultType.none();
            }
            const entity: Awaited<T["Entity"]> = await this.toEntity(model);
            return model ? ResultType.success(entity) : ResultType.none();
        } catch (error) {
            return RepositoryResponseError.handleResultError(error);
        }
    }

    async findMany(
        limit: number,
        offset: number,
        filters?: T["Filter"],
        orderBy?: { field: keyof T["Entity"]; direction: 'ASC' | 'DESC' },
        exact: boolean = false,
        includes: boolean = true
    ): Promise<ResultType<FindAllType<T["Entity"]>>> {
        try {
            const where: WhereOptions = this.makeFilter(filters, exact).build(this.associationMap());

            const options: FindOptions = {
                where,
                limit,
                offset
            };

            if (orderBy) {
                options.order = [[orderBy.field as string, orderBy.direction]];
            }

            const {rows, count} = await this.model.findAndCountAll({
                include: includes ? this.getIncludes() : undefined,
                ...options,
            });

            const entities: T["Entity"][] = await Promise.all(rows.map(model => this.toEntity(model)));

            return ResultType.success({
                entities,
                total: count
            });
        } catch (error) {
            return RepositoryResponseError.handleResultError(error);
        }
    }

    async update(entity: T["Entity"], transaction?: Transaction): Promise<ResultType<T["Entity"]>> {
        try {
            const modelToUpdate = await this.model.findByPk(entity.id, {transaction}) as T["Model"];
            if (!modelToUpdate) {
                return ResultType.failure(new Error("Entity not found"));
            }

            const persistenceData = await this.toPersistence(entity);

            await modelToUpdate.update(persistenceData, {transaction});
            await modelToUpdate.reload({transaction});

            const entityUpdated: ResultType<T["Entity"]> = await this.findById(modelToUpdate.id, transaction);

            if (entityUpdated.isNone() || entityUpdated.isFailure()) {
                return ResultType.failure(new NotFoundError(EntitiesMessage.error.failure.delete(this.getEntityName(entityUpdated))));
            }

            return ResultType.success(entityUpdated.unwrapOrThrow());
        } catch (error) {
            return RepositoryResponseError.handleResultError(error);
        }
    }

    async getMetadata(): Promise<ModelAttributes<T["Model"], Attributes<T["Model"]>>> {
        return this.model.getAttributes();
    }

    protected getIncludes(): FindOptions['include'] {
        return undefined;
    }

    protected async normalizeEntityStatus(model: any): Promise<any> {
        let statusModel = model.get?.('status') ?? model.status;

        if (statusModel && typeof statusModel === 'object' && 'description' in statusModel) {
            return {...model.toJSON(), status: statusModel.description};
        }

        if (model.statusId && this.statusRepo) {
            const statusFind: ResultType<StatusEntity> = await this.statusRepo.findById(model.statusId);
            if (!statusFind.isSuccess()) {
                throw new NotFoundError(`Status com ID ${model.statusId} não encontrado.`);
            }

            const status = statusFind.unwrap();

            return {...model.toJSON(), status: status.description};
        }

        throw new ValidationError(`Campo "status" ou "statusId" ausente no modelo.`);
    }

    protected async normalizeRelations(
        data: Record<string, any>,
        relations: RelationMapType,
        transaction?: Transaction
    ): Promise<T["NormalizedRelations"]> {
        for (const field in relations) {
            const { idField, filterField, repo } = relations[field];

            if (data[field]) {
                let filter: Record<string, any> = {};

                if (Array.isArray(filterField)) {
                    for (const key of filterField) {
                        if (!(key in data[field])) {
                            throw new Error(`O campo ${key} não existe em ${field}`);
                        }
                        filter[key] = data[field][key];
                    }
                } else {
                    filter[filterField] = data[field];
                }

                const entity: ResultType<any> = await repo.findOneByFilter(filter, true, true, transaction);

                if (!entity.isSuccess()) {
                    throw new NotFoundError(`Relacionamento ${field}="${JSON.stringify(data[field])}" não encontrado`);
                }

                data[idField] = entity.unwrapOrThrow().id;
            }
        }

        return data;
    }

    private makeFilter(
        filters?: T["Filter"],
        exact: boolean = false
    ): SequelizeWhereBuilderUtil<T["Filter"]> {
        return new SequelizeWhereBuilderUtil(filters, this.filter(), exact ? 'exact' : 'partial');
    }

    private getEntityName(entity: T["Entity"]): string {
        const entityFullName = entity.constructor.name.toUpperCase();

        return entityFullName.replace("ENTITY", "");
    }
}