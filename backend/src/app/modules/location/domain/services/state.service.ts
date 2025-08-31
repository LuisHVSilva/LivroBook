import {inject, injectable} from "tsyringe";
import {
    IStateRepository,
    StateBaseRepositoryType
} from "@location/infrastructure/repositories/interfaces/IState.repository";
import {EntityUniquenessValidatorFactory} from "@coreShared/factories/entityUniquenessValidator.factory";
import {IRepositoryBase} from "@coreShared/base/interfaces/IRepositoryBase";
import {EntityUniquenessValidator} from "@coreShared/validators/entityUniqueness.validator";
import {StateEntity} from "@location/domain/entities/state.entity";
import {
    CreateStateDTO,
    StateDTO,
    StateFilterDTO,
    UpdateStateDTO
} from "@location/adapters/dtos/state.dto";
import {LogError} from "@coreShared/decorators/LogError";
import {Transaction} from "sequelize";
import {UpdateResultType} from "@coreShared/types/crudResult.type";
import {StatusEntity} from "@status/domain/entities/status.entity";
import {StringUtil} from "@coreShared/utils/string.util";
import {ResultType} from "@coreShared/types/result.type";
import {ConflictError, NotFoundError} from "@coreShared/errors/domain.error";
import {EntitiesMessage} from "@coreShared/messages/entities.message";
import {FindAllType} from "@coreShared/types/findAll.type";
import {StatusTransformer} from "@status/domain/transformers/Status.transformer";
import {IStateService} from "@location/domain/services/interfaces/IState.service";
import {IStatusService} from "@status/domain/services/interfaces/IStatus.service";
import {ICountryService} from "@location/domain/services/interfaces/ICountry.service";
import {DeleteStatusEnum} from "@coreShared/enums/deleteStatus.enum";
import {DeleteReport} from "@coreShared/utils/operationReport.util";

@injectable()
export class StateService implements IStateService {
    //#region PROPERTIES
    private readonly uniquenessValidator: EntityUniquenessValidator<StateBaseRepositoryType>;
    private readonly STATE: string = StateEntity.ENTITY_NAME;
    //#endregion

    //#region CONSTRUCTOR
    constructor(
        @inject("IStateRepository") private readonly repo: IStateRepository,
        @inject("EntityUniquenessValidatorFactory") validatorFactory: EntityUniquenessValidatorFactory,
        @inject("StateRepository") stateRepo: IRepositoryBase<StateBaseRepositoryType>,
        @inject('IStatusService') private readonly statusService: IStatusService,
        @inject('ICountryService') private readonly countryService: ICountryService,
    ) {
        this.uniquenessValidator = validatorFactory(stateRepo);
    }

    //#endregion

    //#region CREATE
    @LogError()
    async create(data: CreateStateDTO, transaction: Transaction): Promise<StateEntity> {
        const status: StatusEntity = await this.statusService.getStatusForNewEntities();
        const statusId: number = status.id!;

        const entity: StateEntity = StateEntity.create({
            description: data.description,
            countryId: data.countryId,
            statusId
        });

        const isUnique: boolean = await this.uniquenessValidator.validate('description', entity.description);

        if (!isUnique) {
            throw new ConflictError(EntitiesMessage.error.conflict.duplicateValue(this.STATE, 'description'))
        }

        await this.validateForeignKeys(entity);

        return (await this.repo.create(entity, transaction)).unwrapOrThrow();
    }

    //#endregion

    //#region READ
    @LogError()
    async getById(id: number): Promise<StateEntity> {
        const found: ResultType<StateEntity> = await this.repo.findById(id);
        const entity: StateEntity | null = found.unwrapOrNull();

        if (!entity) {
            throw new NotFoundError(EntitiesMessage.error.retrieval.notFound(this.STATE));
        }

        return entity;
    }

    @LogError()
    async findMany(filter: StateFilterDTO, page?: number, limit?: number): Promise<FindAllType<StateEntity>> {
        const pageValue: number = page ?? 1;
        const limitValue: number = limit ?? 20;
        const offset: number = (pageValue - 1) * limitValue;

        if (filter?.description) {
            filter.description = StringUtil.toArray(filter.description).map(StatusTransformer.normalizeDescription);
        }

        const found: ResultType<FindAllType<StateEntity>> = await this.repo.findMany(limitValue, offset, filter);

        if (!found.isSuccess()) throw new NotFoundError(EntitiesMessage.error.retrieval.notFound(this.STATE));

        return found.unwrap();
    }

    //#endregion

    //#region UPDATE
    @LogError()
    async update(newData: UpdateStateDTO, transaction: Transaction): Promise<UpdateResultType<StateEntity>> {
        const entity: StateEntity = await this.getById(newData.id);

        let updatedEntity: StateEntity = entity.update(newData);

        if (updatedEntity.isEqual(entity)) {
            return {entity: entity, updated: false};
        }

        await this.validateForeignKeys(updatedEntity);

        if (updatedEntity.hasDifferencesExceptStatus(entity)) {
            if (updatedEntity.description !== entity.description) {
                const isUnique: boolean = await this.uniquenessValidator.validate('description', newData.description!);
                if (!isUnique) {
                    throw new ConflictError(EntitiesMessage.error.conflict.duplicateValue(this.STATE, "description"));
                }
            }
            const updatedStatusId: number = (await this.statusService.getStatusForNewEntities()).id!;
            updatedEntity = updatedEntity.update({statusId: updatedStatusId});
        }

        const updated: ResultType<StateEntity> = await this.repo.update(updatedEntity, transaction);

        return {entity: updated.unwrapOrThrow(), updated: true};
    }

    //#endregion

    //#region DELETE
    @LogError()
    async delete(id: number, transaction: Transaction): Promise<DeleteStatusEnum> {
        let entity: StateEntity;

        try {
            entity = await this.getById(id);
        } catch (error) {
            if (error instanceof NotFoundError) {
                return DeleteStatusEnum.NOT_FOUND;
            }
            throw error;
        }

        const inactiveStatus: StatusEntity = await this.statusService.getStatusForInactiveEntities();

        if (entity.statusId === inactiveStatus.id) {
            return DeleteStatusEnum.ALREADY_INACTIVE;
        }

        const deletedEntity = entity.update({statusId: inactiveStatus.id});
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

    @LogError()
    private async validateForeignKeys(data: Partial<StateDTO>): Promise<void> {
        const validateExistence = async <T>(
            field: keyof StateDTO,
            id: number | undefined,
            service: { getById: (id: number) => Promise<T | null> }
        ): Promise<void> => {
            if (id == null) return;
            if (!(await service.getById(id))) {
                throw new NotFoundError(EntitiesMessage.error.retrieval.notFoundForeignKey(field, id));
            }
        };

        await Promise.all([
            validateExistence("countryId", data.countryId, this.countryService),
            validateExistence("statusId", data.statusId, this.statusService),
        ]);
    }
}
