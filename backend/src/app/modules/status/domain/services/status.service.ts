import {inject, injectable} from "tsyringe";
import {EntityUniquenessValidator} from "@coreShared/validators/entityUniqueness.validator";
import {StatusEntity} from "@status/domain/entities/status.entity";
import {
    CreateStatusDTO,
    FilterStatusDTO,
    StatusBaseRepositoryType, StatusDto,
    UpdateStatusDTO, UpdateStatusResponseDTO
} from "@status/adapters/dtos/status.dto";
import {EntityUniquenessValidatorFactory} from "@coreShared/factories/entityUniquenessValidator.factory";
import {IRepositoryBase} from "@coreShared/base/interfaces/IRepositoryBase";
import {Transaction} from "sequelize";
import {LogError} from "@coreShared/decorators/LogError";
import {ConflictError, NotFoundError, ValidationError} from "@coreShared/errors/domain.error";
import {EntitiesMessage} from "@coreShared/messages/entities.message";
import {IStatusRepository} from "@status/infrastructure/repositories/IStatusRepository";
import {FindAllType} from "@coreShared/types/findAll.type";
import {ResultType} from "@coreShared/types/result.type";
import {ServiceError} from "@coreShared/errors/service.error";
import {UpdateResultType} from "@coreShared/types/crudResult.type";
import {IStatusService} from "@status/domain/services/interfaces/IStatus.service";
import {StatusTransformer} from "@status/domain/transformers/Status.transformer";
import {DeleteReport} from "@coreShared/utils/operationReport.util";
import {DeleteStatusEnum} from "@coreShared/enums/deleteStatus.enum";
import {StatusEnum} from "@status/domain/enum/status.enum";

@injectable()
export class StatusService implements IStatusService {
    //#region PROPERTIES
    private readonly uniquenessValidator: EntityUniquenessValidator<StatusBaseRepositoryType>;
    private readonly STATUS: string = StatusEntity.ENTITY_NAME;
    private readonly DESCRIPTION: string = 'description';
    //#endregion

    //#region CONSTRUCTOR
    constructor(
        @inject("IStatusRepository") private readonly repo: IStatusRepository,
        @inject("EntityUniquenessValidatorFactory") private readonly validatorFactory: EntityUniquenessValidatorFactory,
        @inject("StatusRepository") private readonly statusRepo: IRepositoryBase<StatusBaseRepositoryType>
    ) {
        this.uniquenessValidator = this.validatorFactory(this.statusRepo);
    }

    findOneByFilter(filter: FilterStatusDTO, exact?: boolean): Promise<StatusEntity> {
        throw new Error("Method not implemented.");
    }

    //#endregion

    //#region CREATE
    @LogError()
    async create(data: CreateStatusDTO, transaction: Transaction): Promise<StatusEntity> {
        const entity: StatusEntity = StatusEntity.create({description: data.description, active: false});

        const isUnique: boolean = await this.uniquenessValidator.validate('description', entity.description);
        if (!isUnique) throw new ConflictError(EntitiesMessage.error.conflict.duplicateValue(this.STATUS, this.DESCRIPTION));

        return (await this.repo.create(entity, transaction)).unwrapOrThrow();
    }

    //#endregion

    //#region READ
    @LogError()
    async getById(id: number): Promise<StatusEntity> {
        const found: ResultType<StatusEntity> = await this.repo.findById(id);
        const entity: StatusEntity | null = found.unwrapOrNull();

        if (!entity) throw new NotFoundError(EntitiesMessage.error.retrieval.notFound(this.STATUS));

        return entity;
    }

    @LogError()
    public async getByDescription(description: string): Promise<StatusEntity> {
        const normalizedDescription: string = StatusTransformer.normalizeDescription(description);
        const result: ResultType<StatusEntity> = await this.repo.findOneByFilter({description: [normalizedDescription]});

        const entity: StatusEntity | null = result.unwrapOrNull();
        if (!entity) {
            throw new ValidationError(EntitiesMessage.error.retrieval.notFound(this.STATUS));
        }

        return entity;
    }

    @LogError()
    private async getStausActiveByDescription(description: string): Promise<StatusEntity> {
        const foundedStatus: StatusEntity = await this.getByDescription(description);
        if (!foundedStatus.active) throw new ValidationError(EntitiesMessage.error.retrieval.inactiveStatus);

        return foundedStatus;
    }

    @LogError()
    async findMany(filter: FilterStatusDTO, page?: number, limit?: number): Promise<FindAllType<StatusEntity>> {
        const pageValue: number = page ?? 1;
        const limitValue: number = limit ?? 20;
        const offset: number = (pageValue - 1) * limitValue;

        if (filter.description) {
            const descriptions = Array.isArray(filter.description)
                ? filter.description
                : [filter.description];

            filter.description = descriptions.map(StatusTransformer.normalizeDescription);
        }

        const found: ResultType<FindAllType<StatusEntity>> = await this.repo.findMany(limitValue, offset, filter);

        if (!found.isSuccess()) {
            throw new ServiceError(EntitiesMessage.error.retrieval.notFound(this.STATUS));
        }

        return found.unwrap();
    }

    @LogError()
    async getStatusForNewEntities(): Promise<StatusEntity> {
        return this.getStausActiveByDescription(StatusEnum.PENDING_APPROVAL);
    }

    @LogError()
    async getStatusForUpdateEntities(): Promise<StatusEntity> {
        return this.getStatusForNewEntities();
    }

    @LogError()
    async getStatusForInactiveEntities(): Promise<StatusEntity> {
        return this.getStausActiveByDescription(StatusEnum.INACTIVE);
    }

    @LogError()
    async getStatusForActiveEntities(): Promise<StatusEntity> {
        return this.getStausActiveByDescription(StatusEnum.ACTIVE)
    }


    async getStatusForBlockedEntities(): Promise<StatusEntity> {
        return this.getStausActiveByDescription(StatusEnum.BLOCKED)
    }

    //#endregion

    //#region UPDATE
    @LogError()
    async update(newData: UpdateStatusDTO, transaction: Transaction): Promise<UpdateResultType<UpdateStatusResponseDTO>> {
        const entity: StatusEntity | null = await this.getById(newData.id);

        if (!entity) throw new NotFoundError(EntitiesMessage.error.retrieval.notFound(this.STATUS));

        let updatedEntity: StatusEntity = entity.update(newData);

        if (updatedEntity.isEqual(entity)) {
            return {entity: entity, updated: false};
        }

        if (newData.description) {
            const isUnique: boolean = await this.uniquenessValidator.validate('description', updatedEntity.description);
            if (!isUnique) throw new ConflictError(EntitiesMessage.error.conflict.duplicateValue(this.STATUS, this.DESCRIPTION));

            updatedEntity = updatedEntity.deactivate();
        }

        const updated: ResultType<StatusEntity> = await this.repo.update(updatedEntity, transaction);

        if (!updated.isSuccess()) throw new ServiceError(EntitiesMessage.error.failure.update(this.STATUS));

        return {entity: updated.unwrapOrThrow().toJSON(), updated: true};
    }

    //#endregion

    //#region DELETE
    @LogError()
    async delete(id: number, transaction: Transaction): Promise<DeleteStatusEnum> {
        let entity: StatusEntity;

        try {
            entity = await this.getById(id);
        } catch (error) {
            if (error instanceof NotFoundError) {
                return DeleteStatusEnum.NOT_FOUND;
            }
            throw error;
        }

        if (!entity) return DeleteStatusEnum.NOT_FOUND;

        if (!entity.active) return DeleteStatusEnum.ALREADY_INACTIVE;

        const deletedEntity: StatusEntity = entity.deactivate();
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

    async isStatusActive(statusProperties: Partial<StatusDto>): Promise<boolean> {
        const statusFounded: ResultType<StatusEntity> = await this.repo.findOneByFilter(statusProperties, true);

        if (statusFounded.isNone()) {
            throw new NotFoundError(EntitiesMessage.error.retrieval.notFound(this.STATUS));
        }

        const status = statusFounded.unwrapOrThrow();

        return status.active;
    }

    async isEntityActive(entityStatus: string): Promise<boolean> {
        const statusActiveEntity: StatusEntity = await this.getStatusForActiveEntities();
        return entityStatus === statusActiveEntity.description;
    }
}