import {inject, injectable} from "tsyringe";
import {IStateRepository} from "@location/infrastructure/repositories/interfaces/IState.repository";
import {EntityUniquenessValidatorFactory} from "@coreShared/factories/entityUniquenessValidator.factory";
import {IBaseRepository} from "@coreShared/interfaces/IBaseRepository";
import {EntityUniquenessValidator} from "@coreShared/validators/entityUniqueness.validator";
import {StateEntity} from "@location/domain/entities/state.entity";
import {StateModel} from "@location/infrastructure/models/state.model";
import {StateCreateDTO, StateDTO, StateFilterDTO} from "@location/adapters/dtos/state.dto";
import {LogError} from "@coreShared/decorators/LogError";
import {Transaction} from "sequelize";
import {CreateResultType, UpdateResultType} from "@coreShared/types/crudResult.type";
import {StatusEntity} from "@status/domain/entities/status.entity";
import {StringUtil} from "@coreShared/utils/string.util";
import {CountryTransformer} from "@location/domain/transformers/country.transform";
import {ResultType} from "@coreShared/types/result.type";
import {NotFoundError} from "@coreShared/errors/domain.error";
import {EntitiesMessage} from "@coreShared/messages/entities.message";
import {FindAllType} from "@coreShared/types/findAll.type";
import {StatusTransformer} from "@status/domain/transformers/Status.transformer";
import {ServiceError} from "@coreShared/errors/service.error";
import {IStateService} from "@location/domain/services/interfaces/IState.service";
import {IStatusService} from "@status/domain/services/interfaces/IStatus.service";

@injectable()
export class StateService implements IStateService {
    //#region PROPERTIES
    private readonly uniquenessValidator: EntityUniquenessValidator<StateEntity, StateModel, StateDTO>;
    private readonly STATE: string = StateEntity.ENTITY_NAME;
    //#endregion

    //#region CONSTRUCTOR
    constructor(
        @inject("IStateRepository") private readonly repo: IStateRepository,
        @inject("EntityUniquenessValidatorFactory") validatorFactory: EntityUniquenessValidatorFactory,
        @inject("StateRepository") stateRepo: IBaseRepository<StateEntity, StateModel, StateDTO>,
        @inject('IStatusService') private readonly statusService: IStatusService,
    ) {
        this.uniquenessValidator = validatorFactory(stateRepo);
    }

    //#endregion

    @LogError()
    async createOrGetState(data: StateCreateDTO, transaction: Transaction): Promise<CreateResultType<StateEntity>> {
        const status: StatusEntity = await this.statusService.getStatusForNewEntities();
        const statusId: number = status.id!;

        const entity: StateEntity = StateEntity.create({
            description: data.description,
            countryId: data.countryId,
            statusId
        });

        const isUnique: boolean = await this.uniquenessValidator.validate('description', entity.description);

        if (!isUnique) {
            const stateFilter: StateFilterDTO = {
                description: StringUtil.parseCsvFilter(entity.description, String),
                countryId: StringUtil.parseCsvFilter(entity.countryId.toString(), Number)
            };

            const existing: StateEntity | null = await this.get(stateFilter);
            return {entity: existing!, created: false};
        }

        const created: StateEntity = (await this.repo.create(entity, transaction)).unwrapOrThrow();

        return {entity: created, created: true};
    }


    @LogError()
    async get(filter: StateFilterDTO): Promise<StateEntity | null> {
        if (filter.description) {
            filter.description = CountryTransformer.normalizeDescription(filter.description[0]);
        }

        const found: ResultType<StateEntity | null> = await this.repo.findOneByFilter(filter);

        if (!found.isSuccess()) throw new NotFoundError(EntitiesMessage.error.retrieval.notFound(this.STATE));

        return found.unwrapOrNull();
    }

    @LogError()
    async getById(id: number, nullReturn: boolean = true): Promise<StateEntity | null> {
        const entity = (await this.repo.findById(id)).unwrapOrNull();

        if (!nullReturn && !entity) {
            throw new NotFoundError(EntitiesMessage.error.retrieval.notFound(this.STATE));
        }

        return entity;
    }

    @LogError()
    async getAll(filter: StateFilterDTO, page?: number, limit?: number): Promise<FindAllType<StateEntity>> {
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

    @LogError()
    async updateProperties(currentState: StateEntity, properties: StateDTO, transaction: Transaction): Promise<UpdateResultType<StateEntity>> {
        let updatedState: StateEntity = currentState.withProps(properties);

        const shouldUpdateStatus: boolean = updatedState.statusId !== currentState.statusId;
        const shouldUpdateDescription: boolean = updatedState.description !== currentState.description;
        const shouldUpdateCountryId: boolean = updatedState.countryId !== currentState.countryId;

        if (!shouldUpdateStatus && !shouldUpdateDescription && !shouldUpdateCountryId) {
            return {entity: currentState, updated: false};
        }

        if (shouldUpdateDescription || shouldUpdateCountryId) {
            const pendingApprovalStatus: StatusEntity = await this.statusService.getStatusForUpdateEntities()
            updatedState = updatedState.updateProps({statusId: pendingApprovalStatus.id!})
        }

        const updateResult: boolean = (await this.repo.update(updatedState, transaction)).unwrapOrThrow();

        if (!updateResult) {
            throw new ServiceError(EntitiesMessage.error.failure.update(this.STATE));
        }

        return {entity: updatedState, updated: true};
    }

    @LogError()
    async deleteState(id: number, transaction: Transaction): Promise<void> {
        const inactiveId: number = (await this.statusService.getStatusForInactiveEntities()).id!;
        const entity: StateEntity | null = await this.getById(id);

        if (!entity) throw new NotFoundError(EntitiesMessage.error.retrieval.notFound(this.STATE));

        await this.updateProperties(entity, {statusId: inactiveId}, transaction);
    }
}
