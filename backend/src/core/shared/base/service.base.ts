import {DtoBaseType} from "@coreShared/types/entity.type";
import {IServiceBase} from "@coreShared/base/interfaces/IServiceBase";
import {ResultType} from "@coreShared/types/result.type";
import {IRepositoryBase} from "@coreShared/base/interfaces/IRepositoryBase";
import {NotFoundError} from "@coreShared/errors/domain.error";
import {EntitiesMessage} from "@coreShared/messages/entities.message";
import {LogError} from "@coreShared/decorators/LogError";
import {FindAllType} from "@coreShared/types/findAll.type";
import {ServiceError} from "@coreShared/errors/service.error";
import {Transaction} from "sequelize";
import {UpdateResultType} from "@coreShared/types/crudResult.type";
import {EntityBase} from "@coreShared/base/entity.base";
import {IStatusService} from "@status/domain/services/interfaces/IStatus.service";
import {DeleteStatusEnum} from "@coreShared/enums/deleteStatus.enum";
import {StatusEntity} from "@status/domain/entities/status.entity";
import {DeleteReport} from "@coreShared/utils/operationReport.util";

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
    async create(data: T["CreateDTO"], transaction: Transaction): Promise<TEntity> {
        const status: StatusEntity = await this.statusService.getStatusForNewEntities();
        const statusId: number = status.id!;

        const entity: TEntity = await this.createEntity(data, statusId);

        await this.validateForeignKeys(entity);
        await this.uniquenessValidatorEntity(entity);

        return (await this.repo.create(entity, transaction)).unwrapOrThrow();
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

    @LogError()
    async findMany(filter: T['FilterDTO'], page?: number, limit?: number): Promise<FindAllType<TEntity>> {
        const pageValue: number = page ?? 1;
        const limitValue: number = limit ?? 20;
        const offset: number = (pageValue - 1) * limitValue;

        const filterTransformed: T['FilterDTO'] = await this.filterTransform(filter);

        const found: ResultType<FindAllType<TEntity>> = await this.repo.findMany(limitValue, offset, filterTransformed);

        if (!found.isSuccess()) {
            throw new ServiceError(EntitiesMessage.error.retrieval.notFound(this.entityClass.name));
        }

        return found.unwrap();
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
            const updatedStatusId: number = (await this.statusService.getStatusForNewEntities()).id!;
            updatedEntity = updatedEntity.update({statusId: updatedStatusId} as any);
        }

        const updated: ResultType<TEntity> = await this.repo.update(updatedEntity, transaction);
        return {entity: updated.unwrapOrThrow().toJSON(), updated: true};
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

        if (entity.getProps().statusId === inactiveStatus.id) {
            return DeleteStatusEnum.ALREADY_INACTIVE;
        }

        const deletedEntity: TEntity = entity.update({statusId: inactiveStatus.id});
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
     * Validates existence + asset for generic child entities
     * @param field -> child field ID description.
     * @param id -> child field ID value.
     * @param service -> child field service
     * @protected
     */
    protected async validateExistence<T extends { statusId: number }>(
        field: string,
        id: number | undefined,
        service: { getById: (id: number) => Promise<T | null> }
    ): Promise<void> {
        if (!id) {
            throw new ServiceError(EntitiesMessage.error.validation.idRequired);
        }

        const entity = await service.getById(id);

        if (!entity) {
            throw new NotFoundError(
                EntitiesMessage.error.retrieval.notFoundForeignKey(field, id)
            );
        }

        const activeStatusId: number = (await this.statusService.getStatusForActiveEntities()).id!;
        if (entity.statusId !== activeStatusId) {
            throw new ServiceError(
                EntitiesMessage.error.validation.inactiveEntity((entity as any).constructor.name)
            );
        }
    }

    /**
     * Validates the existence of the status and whether it is active (active === true)
     * @protected
     * @param id -> status id value
     */

    protected async validateStatusExistence(
        id: number | undefined,
    ): Promise<void> {
        if (!id) {
            throw new ServiceError(EntitiesMessage.error.validation.idRequired);
        }

        const isStatusActive: boolean = await this.statusService.isActive(id);

        if (!isStatusActive) {
            throw new ServiceError(
                EntitiesMessage.error.validation.inactiveEntity(StatusEntity.name)
            );
        }
    }

    //#endregion

    protected abstract uniquenessValidatorEntity(entity: TEntity): Promise<void>;

    protected abstract createEntity(data: T["CreateDTO"], statusId: number): Promise<TEntity>;

    protected abstract filterTransform(input: T['FilterDTO']): T['FilterDTO'];

    protected abstract validateForeignKeys(newEntity: Partial<TEntity>): Promise<void>;
}
