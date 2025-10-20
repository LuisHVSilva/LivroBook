import {DtoBaseType} from "@coreShared/types/entity.type";
import {IServiceBase} from "@coreShared/base/interfaces/IServiceBase";
import {ResultType} from "@coreShared/types/result.type";
import {IRepositoryBase} from "@coreShared/base/interfaces/IRepositoryBase";
import {InactiveError, NotFoundError} from "@coreShared/errors/domain.error";
import {EntitiesMessage} from "@coreShared/messages/entities.message";
import {LogError} from "@coreShared/decorators/LogError";
import {FindAllType} from "@coreShared/types/findAll.type";
import {ServiceError} from "@coreShared/errors/service.error";
import {AbstractDataType, ModelAttributeColumnOptions, Transaction} from "sequelize";
import {UpdateResultType} from "@coreShared/types/crudResult.type";
import {EntityBase} from "@coreShared/base/entity.base";
import {IStatusService} from "@status/domain/services/interfaces/IStatus.service";
import {DeleteStatusEnum} from "@coreShared/enums/deleteStatus.enum";
import {StatusEntity} from "@status/domain/entities/status.entity";
import {DeleteReport} from "@coreShared/utils/operationReport.util";
import {SimplifiedMetadataAttribute} from "@coreShared/types/metadata.type";

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

    //#region CREATE
    @LogError()
    async create(data: T["CreateDTO"], transaction: Transaction): Promise<TEntity> {
        const status: StatusEntity = await this.statusService.getStatusForNewEntities();
        const statusDescription: string = status.description;

        const entity: TEntity = await this.createEntity(data, statusDescription);

        await this.validateForeignKeys(entity, transaction);
        await this.uniquenessValidatorEntity(entity);

        const result: ResultType<TEntity> = await this.repo.create(entity, transaction);
        return result.unwrapOrThrow()
    }

    //#endregion

    //#region READ
    @LogError()
    async getById(id: number): Promise<TEntity> {
        const found: ResultType<TEntity> = await this.repo.findById(id);
        const entity: TEntity | null = found.unwrapOrNull();

        if (!entity) {
            throw new NotFoundError(EntitiesMessage.error.retrieval.notFound(this.entityClass.name))
        }

        return entity;
    }

    @LogError()
    async findOneByFilter(filter: T["FilterDTO"], exact?: boolean, transaction?: Transaction): Promise<TEntity> {
        const filterTransformed: T['FilterDTO'] = await this.filterTransform(filter);

        const found: ResultType<FindAllType<TEntity>> = await this.repo.findOneByFilter(filterTransformed, exact, true, transaction);

        if (!found.isSuccess()) {
            throw new ServiceError(EntitiesMessage.error.retrieval.notFound(this.entityClass.name));
        }

        return found.unwrap();
    }

    @LogError()
    async findMany(filter: T['FilterDTO'], page?: number, limit?: number, exact: boolean = true): Promise<FindAllType<TEntity>> {
        const pageValue: number = page ?? 1;
        const limitValue: number = limit ?? 20;
        const offset: number = (pageValue - 1) * limitValue;

        const filterTransformed: T['FilterDTO'] = await this.filterTransform(filter);

        const found: ResultType<FindAllType<TEntity>> = await this.repo.findMany(limitValue, offset, filterTransformed, {
            field: "id",
            direction: "ASC"
        }, exact);

        if (!found.isSuccess()) {
            throw new ServiceError(EntitiesMessage.error.retrieval.notFound(this.entityClass.name));
        }

        return found.unwrap();
    }

    @LogError()
    async getMetadata(): Promise<SimplifiedMetadataAttribute[]> {
        const attributes = await this.repo.getMetadata();

        return Object.entries(attributes).map(([name, options]) => {
            const column = options as ModelAttributeColumnOptions;

            const typeStr = (column.type as any).key ?? (column.type as AbstractDataType).toSql() ?? String(column.type);

            // const type = typeof column.type !== "object" ? String(column.type) : "column.type.toString()";

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
    @LogError()
    async update(newData: T["UpdateDTO"], transaction: Transaction): Promise<UpdateResultType<TEntity>> {
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
    }

    //#endregion

    //#region DELETE
    @LogError()
    async delete(id: number, transaction: Transaction): Promise<DeleteStatusEnum> {
        let entity: TEntity;

        try {
            entity = await this.getById(id);
        } catch (error) {
            if (error instanceof NotFoundError) {
                return DeleteStatusEnum.NOT_FOUND;
            }
            throw error;
        }

        const inactiveStatus: StatusEntity = await this.statusService.getStatusForInactiveEntities();

        if (entity.getProps().status === inactiveStatus.description) {
            return DeleteStatusEnum.ALREADY_INACTIVE;
        }

        const deletedEntity: TEntity = entity.update({status: inactiveStatus.description});
        await this.repo.update(deletedEntity, transaction);

        return DeleteStatusEnum.DELETED;
    }

    @LogError()
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
     * Valida a existência e o status ativo de uma entidade relacionada.
     *
     * Suporta filtro simples (campo único) e composto (múltiplos campos).
     *
     * @param fieldName Nome lógico da entidade (ex: "País", "Código de telefone")
     * @param fieldValue Valor do campo simples (se houver)
     * @param serviceFilter Nome do campo OU objeto com filtros compostos
     * @param service Serviço da entidade relacionada (deve expor findOneByFilter)
     * @param acceptUndefined
     * @param transaction
     */
    protected async validateExistence<T extends { status: string }>(
        fieldName: string,
        fieldValue: string | undefined,
        serviceFilter: string | Record<string, any>,
        service: { findOneByFilter: (filter: Record<string, any>, exact?: boolean, transaction?: Transaction) => Promise<T> },
        acceptUndefined: boolean = false,
        transaction?: Transaction
    ): Promise<void> {
        const filter: Record<string, any> = typeof serviceFilter === "string" ? {[serviceFilter]: fieldValue} : serviceFilter;

        for (const [key, value] of Object.entries(filter)) {
            if (value === undefined || value === null || value === "") {
                if (acceptUndefined) {
                    continue;
                }
                throw new ServiceError(
                    EntitiesMessage.error.validation.requiredField(key)
                );
            }
        }

        let entity: T;
        try {
            entity = await service.findOneByFilter(filter, true, transaction);
        } catch (e) {
            throw new NotFoundError(
                EntitiesMessage.error.retrieval.notFoundForeignKey(fieldName)
            );
        }

        if (!entity) {
            throw new NotFoundError(
                EntitiesMessage.error.retrieval.notFoundForeignKey(fieldName)
            );
        }

        const isStatusActive: boolean = await this.statusService.isEntityActive(entity.status);

        if (!isStatusActive) {
            throw new InactiveError(
                EntitiesMessage.error.validation.inactiveEntity(fieldName)
            );
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
            throw new ServiceError(EntitiesMessage.error.validation.descriptionRequired);
        }

        const isStatusActive: boolean = await this.statusService.isStatusActive({description: statusDescription});

        if (!isStatusActive) {
            throw new ServiceError(
                EntitiesMessage.error.validation.inactiveEntity(StatusEntity.name)
            );
        }
    }

    //#endregion

    protected abstract uniquenessValidatorEntity(entity: TEntity, previousEntity?: TEntity): Promise<void>;

    protected abstract createEntity(data: T["CreateDTO"], status: string): Promise<TEntity>;

    protected abstract filterTransform(input: T['FilterDTO']): T['FilterDTO'];

    protected abstract validateForeignKeys(newEntity: Partial<TEntity>, transaction?: Transaction): Promise<void>;
}
