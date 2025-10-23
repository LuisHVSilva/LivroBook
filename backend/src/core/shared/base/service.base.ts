import {DtoBaseType} from "@coreShared/types/entity.type";
import {IServiceBase} from "@coreShared/base/interfaces/IServiceBase";
import {ResultType} from "@coreShared/types/result.type";
import {IRepositoryBase} from "@coreShared/base/interfaces/IRepositoryBase";
import {EntitiesMessage} from "@coreShared/messages/entities.message";
import {FindAllType} from "@coreShared/types/findAll.type";
import {AbstractDataType, ModelAttributeColumnOptions, Transaction} from "sequelize";
import {UpdateResultType} from "@coreShared/types/crudResult.type";
import {EntityBase} from "@coreShared/base/entity.base";
import {IStatusService} from "@status/domain/services/interfaces/IStatus.service";
import {DeleteStatusEnum} from "@coreShared/enums/deleteStatus.enum";
import {StatusEntity} from "@status/domain/entities/status.entity";
import {DeleteReport} from "@coreShared/utils/operationReport.util";
import {SimplifiedMetadataAttribute} from "@coreShared/types/metadata.type";
import {InactiveError, NotFoundError, NullableError, ServiceError} from "@coreShared/errors/classes.error";

export abstract class ServiceBase<
    T extends DtoBaseType<any, any, any, any, any>,
    TEntity extends EntityBase<any>
> implements IServiceBase<T, TEntity> {

    protected constructor(
        protected readonly repo: IRepositoryBase<any>,
        protected readonly entityClass: { new(...args: any[]): TEntity },
        protected readonly statusService: IStatusService,
    ) {
    }

    protected abstract uniquenessValidatorEntity(entity: TEntity, previousEntity?: TEntity): Promise<void>;

    protected abstract createEntity(data: T["CreateDTO"], status: string): Promise<TEntity>;

    protected abstract filterTransform(input: T['FilterDTO']): T['FilterDTO'];

    protected abstract validateForeignKeys(newEntity: Partial<TEntity>, transaction?: Transaction): Promise<void>;

    //#region CREATE

    async create(data: T["CreateDTO"], transaction: Transaction): Promise<TEntity> {
        try {
            const status: StatusEntity = await this.statusService.getStatusForNewEntities();
            const statusDescription: string = status.description;

            const entity: TEntity = await this.createEntity(data, statusDescription);

            await this.validateForeignKeys(entity, transaction);
            await this.uniquenessValidatorEntity(entity);

            const result: ResultType<TEntity> = await this.repo.create(entity, transaction);
            return result.unwrapOrThrow()
        } catch (error) {
            throw new ServiceError("Erro inesperado: " + String(error));
        }
    }

    //#endregion

    //#region READ

    async getById(id: number): Promise<TEntity> {
        const found: ResultType<TEntity> = await this.repo.findById(id);
        const entity: TEntity | null = found.unwrapOrNull();

        if (!entity) {
            throw new NotFoundError(EntitiesMessage.error.retrieval.notFound(this.entityClass.name))
        }

        return entity;
    }

    async findOneByFilter(filter: T["FilterDTO"], exact?: boolean, transaction?: Transaction): Promise<TEntity> {
        try {
            const filterTransformed: T['FilterDTO'] = await this.filterTransform(filter);

            const found: ResultType<FindAllType<TEntity>> = await this.repo.findOneByFilter(filterTransformed, exact, true, transaction);

            return found.unwrapOrThrow();
        } catch (error) {
            throw new ServiceError("Erro inesperado: " + String(error));
        }
    }

    async findMany(filter: T['FilterDTO'], page?: number, limit?: number, exact: boolean = true): Promise<FindAllType<TEntity>> {
        try {
            const pageValue: number = page ?? 1;
            const limitValue: number = limit ?? 20;
            const offset: number = (pageValue - 1) * limitValue;

            const filterTransformed: T['FilterDTO'] = await this.filterTransform(filter);

            const found: ResultType<FindAllType<TEntity>> = await this.repo.findMany(limitValue, offset, filterTransformed, {
                field: "id",
                direction: "ASC"
            }, exact);

            return found.unwrap();
        } catch (error) {
            throw new ServiceError("Erro inesperado: " + String(error));
        }
    }

    async getMetadata(): Promise<SimplifiedMetadataAttribute[]> {
        const attributes = await this.repo.getMetadata();

        return Object.entries(attributes).map(([name, options]) => {
            const column = options as ModelAttributeColumnOptions;

            const typeStr = (column.type as any).key ?? (column.type as AbstractDataType).toSql() ?? String(column.type);

            return {
                columnName: name,
                dataType: typeStr,
                allowNull: column.allowNull ?? true,
                maxLength: (column.validate as any)?.len?.[1],
                minLength: (column.validate as any)?.len?.[0],
            };
        });
    }

    //#endregion

    //#region UPDATE

    async update(newData: T["UpdateDTO"], transaction: Transaction): Promise<UpdateResultType<TEntity>> {
        try {
            const entity: TEntity = await this.getById(newData.id);

            let updatedEntity: TEntity = entity.update(newData);

            await this.validateForeignKeys(updatedEntity);

            if (updatedEntity.isEqual(entity)) {
                return {entity, updated: false};
            }

            if (updatedEntity.hasDifferencesExceptStatus(entity)) {
                await this.uniquenessValidatorEntity(updatedEntity, entity);

                const updatedStatus: string = (await this.statusService.getStatusForNewEntities()).description;
                updatedEntity = updatedEntity.update({status: updatedStatus} as any);
            }

            const updated: ResultType<TEntity> = await this.repo.update(updatedEntity, transaction);
            return {entity: updated.unwrapOrThrow(), updated: true};
        } catch (error) {
            throw new ServiceError("Erro inesperado: " + String(error));
        }
    }

    //#endregion

    //#region DELETE

    async delete(id: number, transaction: Transaction): Promise<DeleteStatusEnum> {
        try {
            const entity: TEntity | null = await this.getById(id);

            if (!entity) {
                return DeleteStatusEnum.NOT_FOUND;
            }

            const inactiveStatus: StatusEntity = await this.statusService.getStatusForInactiveEntities();

            if (entity.getProps().status === inactiveStatus.description) {
                return DeleteStatusEnum.ALREADY_INACTIVE;
            }

            const deletedEntity: TEntity = entity.update({status: inactiveStatus.description});
            await this.repo.update(deletedEntity, transaction);

            return DeleteStatusEnum.DELETED;
        } catch (error) {
            throw new ServiceError("Erro inesperado: " + String(error));
        }
    }

    async deleteMany(ids: number[], transaction: Transaction): Promise<DeleteReport> {
        const deleted: number[] = [];
        const alreadyInactive: number[] = [];
        const notFound: number[] = [];

        for (const id of ids) {
            const deleteEntityResult: DeleteStatusEnum = await this.delete(id, transaction);

            switch (deleteEntityResult) {
                case DeleteStatusEnum.DELETED:
                    deleted.push(id);
                    break;
                case DeleteStatusEnum.ALREADY_INACTIVE:
                    alreadyInactive.push(id);
                    break;
                default:
                    notFound.push(id);
                    break;
            }
        }

        return {deleted, alreadyInactive, notFound};
    }

    //#endregion

    //#region VALIDATIONS
    /**
     * Validates the existence and active status of a related entity.
     *
     * Supports simple (single field) and compound (multiple field) filters.
     *
     * @param fieldName Logical name of the entity (e.g., "Country", "Phone Code")
     * @param fieldValue Value of the simple field (if any)
     * @param serviceFilter Name of the field OR object with compound filters
     * @param service Service of the related entity (must expose findOneByFilter)
     * @param acceptUndefined
     * @param transaction
     */
    protected async validateExistence<T extends { status: string }>(
        fieldName: string,
        fieldValue: string | undefined,
        serviceFilter: string | Record<string, any>,
        service: {
            findOneByFilter: (filter: Record<string, any>, exact?: boolean, transaction?: Transaction) => Promise<T>
        },
        acceptUndefined: boolean = false,
        transaction?: Transaction
    ): Promise<void> {
        const filter: Record<string, any> = typeof serviceFilter === "string" ? {[serviceFilter]: fieldValue} : serviceFilter;

        for (const [key, value] of Object.entries(filter)) {
            if (value === undefined || value === null || value === "") {
                if (acceptUndefined) {
                    continue;
                }
                throw new NullableError(EntitiesMessage.error.validation.requiredField(key));
            }
        }

        let entity: T;
        try {
            entity = await service.findOneByFilter(filter, true, transaction);
        } catch (e) {
            throw new NotFoundError(EntitiesMessage.error.retrieval.notFoundForeignKey(fieldName));
        }

        const isStatusActive: boolean = await this.statusService.isEntityActive(entity.status);

        if (!isStatusActive) {
            throw new InactiveError(EntitiesMessage.error.validation.inactiveEntity(fieldName));
        }
    }

    /**
     * Validates the existence of the status and whether it is active (active === true)
     * @protected
     * @param statusDescription
     */
    protected async validateStatusExistence(
        statusDescription: string | undefined
    ): Promise<void> {
        if (!statusDescription) {
            throw new NullableError(EntitiesMessage.error.validation.descriptionRequired);
        }

        const isStatusActive: boolean = await this.statusService.isStatusActive({description: statusDescription});

        if (!isStatusActive) {
            throw new InactiveError(EntitiesMessage.error.validation.inactiveEntity(StatusEntity.name));
        }
    }

    //#endregion
}
