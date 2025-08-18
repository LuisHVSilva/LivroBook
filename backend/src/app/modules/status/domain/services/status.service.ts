import {inject, injectable} from "tsyringe";
import {EntityUniquenessValidator} from "@coreShared/validators/entityUniqueness.validator";
import {StatusEntity} from "@status/domain/entities/status.entity";
import {StatusModel} from "@status/infrastructure/models/status.model";
import {
    CreateStatusDTO,
    FindFilterStatusDTO,
    StatusDto, UpdateStatusDTO
} from "@status/adapters/dtos/status.dto";
import {EntityUniquenessValidatorFactory} from "@coreShared/factories/entityUniquenessValidator.factory";
import {IBaseRepository} from "@coreShared/interfaces/IBaseRepository";
import {Transaction} from "sequelize";
import {LogError} from "@coreShared/decorators/LogError";
import {ConflictError, NotFoundError, ValidationError} from "@coreShared/errors/domain.error";
import {EntitiesMessage} from "@coreShared/messages/entities.message";
import {IStatusRepository} from "@status/infrastructure/repositories/IStatusRepository";
import {FindAllType} from "@coreShared/types/findAll.type";
import {ResultType} from "@coreShared/types/result.type";
import {ServiceError} from "@coreShared/errors/service.error";

import {CreateResultType} from "@coreShared/types/crudResult.type";
import {IStatusService} from "@status/domain/services/interfaces/IStatus.service";
import {StatusTransformer} from "@status/domain/transformers/Status.transformer";

@injectable()
export class StatusService implements IStatusService {
    //#region PROPERTIES
    private readonly uniquenessValidator: EntityUniquenessValidator<StatusEntity, StatusModel, StatusDto>;
    private readonly STATUS: string = StatusEntity.ENTITY_NAME;
    private readonly DESCRIPTION: string = 'description';
    private readonly NEW_ENTITIES_STATUS: string = "PENDENTE DE APROVACAO";
    private readonly UPDATED_ENTITIES_STATUS: string = "PENDENTE DE APROVACAO";
    private readonly INACTIVE_ENTITIES_STATUS: string = "INATIVO";
    //#endregion

    //#region CONSTRUCTOR
    constructor(
        @inject("IStatusRepository") private readonly repo: IStatusRepository,
        @inject("EntityUniquenessValidatorFactory") validatorFactory: EntityUniquenessValidatorFactory,
        @inject("StatusRepository") statusRepo: IBaseRepository<StatusEntity, StatusModel, StatusDto>
    ) {
        this.uniquenessValidator = validatorFactory(statusRepo);
    }

    //#endregion

    @LogError()
    async create(data: CreateStatusDTO, transaction: Transaction): Promise<CreateResultType<StatusEntity>> {
        const entity: StatusEntity = StatusEntity.create({description: data.description, active: false});
        const isUnique: boolean = await this.uniquenessValidator.validate('description', entity.description);

        if (!isUnique) {
            throw new ConflictError(EntitiesMessage.error.conflict.duplicateValue(this.STATUS, this.DESCRIPTION));
        }

        const created: StatusEntity = (await this.repo.create(entity, transaction)).unwrapOrThrow();

        return {entity: created, created: true};
    }

    @LogError()
    async get(filter: FindFilterStatusDTO): Promise<StatusEntity | null> {

        if (filter.description) {
            filter.description = filter.description.map(StatusTransformer.normalizeDescription);
        }

        const found: StatusEntity | null = (await this.repo.findOneByFilter(filter)).unwrapOrNull();

        return found ?? null;
    }

    @LogError()
    async getById(id: number): Promise<StatusEntity | null> {
        const found: StatusEntity | null = (await this.repo.findById(id)).unwrapOrNull();

        return found ?? null;
    }

    @LogError()
    async getStatusActiveById(id: number): Promise<StatusEntity> {
        const foundedStatus = await this.getById(id);

        if (!foundedStatus?.active) {
            throw new ValidationError(EntitiesMessage.error.retrieval.inactiveStatus);
        }

        return foundedStatus;
    }

    @LogError()
    async findByDescription(description: string): Promise<StatusEntity | null> {
        const descriptionFilter: string = StatusTransformer.normalizeDescription(description);
        const statusFinder: ResultType<StatusEntity> = await this.repo.findByDescription(descriptionFilter);

        if (!statusFinder.isSuccess()) {
            throw new ValidationError(EntitiesMessage.error.retrieval.notFound(this.STATUS));
        }

        return statusFinder.unwrap();
    }

    @LogError()
    async findStausActiveByDescription(description: string): Promise<StatusEntity> {
        const foundedStatus = await this.findByDescription(description);

        if (!foundedStatus) {
            throw new ValidationError(EntitiesMessage.error.retrieval.notFound(this.STATUS));
        }

        if (!foundedStatus.active) {
            throw new ValidationError(EntitiesMessage.error.retrieval.inactiveStatus);
        }

        return foundedStatus;
    }

    @LogError()
    async findAll(filter: FindFilterStatusDTO, page?: number, limit?: number): Promise<FindAllType<StatusEntity>> {
        const pageValue: number = page ?? 1;
        const limitValue: number = limit ?? 20;
        const offset: number = (pageValue - 1) * limitValue;

        if (filter.description) {
            filter.description = filter.description.map(StatusTransformer.normalizeDescription);
        }

        const found: ResultType<FindAllType<StatusEntity>> = await this.repo.findMany(limitValue, offset, filter);

        if (!found.isSuccess()) {
            throw new ServiceError(EntitiesMessage.error.retrieval.notFound(this.STATUS));
        }

        return found.unwrap();
    }

    @LogError()
    async delete(id: number[], transaction: Transaction): Promise<void> {
        const {entities, total}: FindAllType<StatusEntity> = await this.findAll({id});

        if (total === 0) {
            throw new NotFoundError(EntitiesMessage.error.retrieval.notFound(this.STATUS));
        }

        for (const entity of entities) {
            const deactivateEntity: StatusEntity = entity.deactivate();
            const updated: ResultType<boolean> = await this.repo.update(deactivateEntity, transaction);

            if (!updated.isSuccess()) {
                throw new ServiceError(EntitiesMessage.error.failure.delete(this.STATUS));
            }
        }
    }

    @LogError()
    async update(newData: UpdateStatusDTO, transaction: Transaction): Promise<StatusEntity> {
        let entity: StatusEntity | null = await this.getById(newData.id);

        if (!entity) {
            throw new NotFoundError(EntitiesMessage.error.retrieval.notFound(this.STATUS))
        }

        if (newData.newActive !== undefined) {
            entity = newData.newActive ? entity.activate() : entity.deactivate();
        }

        if (newData.newDescription !== undefined) {
            entity = entity.updateDescription(newData.newDescription).deactivate();
            const isUnique: boolean = await this.uniquenessValidator.validate('description', entity.description);

            if (!isUnique) {
                throw new ConflictError(EntitiesMessage.error.conflict.duplicateValue(this.STATUS, this.DESCRIPTION))
            }
        }

        const updated: ResultType<boolean> = await this.repo.update(entity, transaction);

        if (!updated.isSuccess() || (updated.isSuccess()) && !updated.unwrap()) {
            throw new ServiceError(EntitiesMessage.error.failure.update(this.STATUS));
        }

        return entity;
    }

    @LogError()
    async getStatusForNewEntities(): Promise<StatusEntity> {
        return this.findStausActiveByDescription(this.NEW_ENTITIES_STATUS);
    }

    @LogError()
    async getStatusForUpdateEntities(): Promise<StatusEntity> {
        return this.findStausActiveByDescription(this.UPDATED_ENTITIES_STATUS);
    }

    @LogError()
    async getStatusForInactiveEntities(): Promise<StatusEntity> {
        return this.findStausActiveByDescription(this.INACTIVE_ENTITIES_STATUS);
    }
}