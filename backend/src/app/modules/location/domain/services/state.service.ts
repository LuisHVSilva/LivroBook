import {inject, injectable} from "tsyringe";
import {IStateRepository} from "@location/infrastructure/repositories/interfaces/IState.repository";
import {EntityUniquenessValidatorFactory} from "@coreShared/factories/entityUniquenessValidator.factory";
import {IRepositoryBase} from "@coreShared/base/interfaces/IRepositoryBase";
import {EntityUniquenessValidator} from "@coreShared/validators/entityUniqueness.validator";
import {StateEntity} from "@location/domain/entities/state.entity";
import {LogError} from "@coreShared/decorators/LogError";
import {ConflictError} from "@coreShared/errors/domain.error";
import {EntitiesMessage} from "@coreShared/messages/entities.message";
import {IStateService} from "@location/domain/services/interfaces/IState.service";
import {IStatusService} from "@status/domain/services/interfaces/IStatus.service";
import {ICountryService} from "@location/domain/services/interfaces/ICountry.service";
import {ServiceBase} from "@coreShared/base/service.base";
import {StateTransformer} from "@location/domain/transformers/state.transform";
import {StateBaseRepositoryType, StateDtoBaseType} from "@location/adapters/dtos/state.dto";

@injectable()
export class StateService extends ServiceBase<StateDtoBaseType, StateEntity> implements IStateService {
    //#region PROPERTIES
    private readonly uniquenessValidator: EntityUniquenessValidator<StateBaseRepositoryType>;
    private readonly STATE: string = StateEntity.ENTITY_NAME;
    //#endregion

    //#region CONSTRUCTOR
    constructor(
        @inject("IStateRepository") protected readonly repo: IStateRepository,
        @inject("EntityUniquenessValidatorFactory") private readonly validatorFactory: EntityUniquenessValidatorFactory,
        @inject("StateRepository") private readonly stateRepo: IRepositoryBase<StateBaseRepositoryType>,
        @inject('IStatusService') protected readonly statusService: IStatusService,
        @inject('ICountryService') private readonly countryService: ICountryService,
    ) {
        super(repo, StateEntity, statusService);
        this.uniquenessValidator = this.validatorFactory(this.stateRepo);
    }

    //#endregion

    //#region HELPERS
    @LogError()
    protected async createEntity(data: StateDtoBaseType["CreateDTO"], statusId: number): Promise<StateEntity> {
        return StateEntity.create({
            description: data.description,
            countryId: data.countryId,
            statusId
        });
    }

    @LogError()
    protected async uniquenessValidatorEntity(entity: StateEntity): Promise<void> {
        const isUnique: boolean = await this.uniquenessValidator.validate('description', entity.description);

        if (!isUnique) throw new ConflictError(EntitiesMessage.error.conflict.duplicateValue(this.STATE, 'description'));
    }

    @LogError()
    protected filterTransform(input: StateDtoBaseType['FilterDTO']): StateDtoBaseType['FilterDTO'] {
        const transformedFilter: StateDtoBaseType['FilterDTO'] = {...input};

        if (input.description !== undefined) {
            transformedFilter.description = input.description.map(desc =>
                StateTransformer.normalizeDescription(desc)
            );
        }

        return transformedFilter;
    }

    @LogError()
    protected async validateForeignKeys(data: Partial<StateDtoBaseType["DTO"]>): Promise<void> {
        await Promise.all([
            this.validateExistence("countryId", data.countryId, this.countryService),
            this.validateStatusExistence(data.statusId),
        ]);
    }
    //#endregion
}
