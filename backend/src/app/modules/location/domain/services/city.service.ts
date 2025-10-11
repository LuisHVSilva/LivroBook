import {inject, injectable} from "tsyringe";
import {ICityRepository} from "@location/infrastructure/repositories/interfaces/ICity.repository";
import {EntityUniquenessValidator} from "@coreShared/validators/entityUniqueness.validator";
import {CityEntity} from "@location/domain/entities/city.entity";
import {EntityUniquenessValidatorFactory} from "@coreShared/factories/entityUniquenessValidator.factory";
import {IRepositoryBase} from "@coreShared/base/interfaces/IRepositoryBase";
import {LogError} from "@coreShared/decorators/LogError";
import {ConflictError} from "@coreShared/errors/domain.error";
import {EntitiesMessage} from "@coreShared/messages/entities.message";
import {ICityService} from "@location/domain/services/interfaces/ICity.service";
import {IStatusService} from "@status/domain/services/interfaces/IStatus.service";
import {IStateService} from "@location/domain/services/interfaces/IState.service";
import {ServiceBase} from "@coreShared/base/service.base";
import {CityTransformer} from "@location/domain/transformers/city.transform";
import {CityBaseRepositoryType, CityDtoBaseType} from "@location/adapters/dtos/city.dto";
import {StringUtil} from "@coreShared/utils/string.util";
import {StatusTransformer} from "@status/domain/transformers/Status.transformer";
import {StateTransformer} from "@location/domain/transformers/state.transform";

@injectable()
export class CityService extends ServiceBase<CityDtoBaseType, CityEntity> implements ICityService {
    //#region PROPERTIES
    private readonly uniquenessValidator: EntityUniquenessValidator<CityBaseRepositoryType>;
    private readonly CITY: string = CityEntity.ENTITY_NAME;
    //#endregion

    //#region CONSTRUCTOR
    constructor(
        @inject("ICityRepository")
        protected readonly repo: ICityRepository,
        @inject("EntityUniquenessValidatorFactory")
        private readonly validatorFactory: EntityUniquenessValidatorFactory,
        @inject("CityRepository")
        private readonly cityRepo: IRepositoryBase<CityBaseRepositoryType>,
        @inject('IStatusService')
        protected readonly statusService: IStatusService,
        @inject("IStateService")
        private readonly stateService: IStateService,
    ) {
        super(repo, CityEntity, statusService);
        this.uniquenessValidator = this.validatorFactory(this.cityRepo);
    }

    //#endregion

    //#region HELPERS
    @LogError()
    protected async createEntity(data: CityDtoBaseType["CreateDTO"], status: string): Promise<CityEntity> {
        return CityEntity.create({
            description: data.description,
            state: data.state,
            status
        });
    }

    @LogError()
    protected async uniquenessValidatorEntity(entity: CityEntity, previousEntity?: CityEntity): Promise<void> {
        const isUnique: boolean = await this.uniquenessValidator.validate('description', entity.description, previousEntity);

        if (!isUnique) {
            throw new ConflictError(EntitiesMessage.error.conflict.duplicateValue(this.CITY, 'description'));
        }
    }

    @LogError()
    protected filterTransform(input: CityDtoBaseType['FilterDTO']): CityDtoBaseType['FilterDTO'] {
        return StringUtil.applyFilterTransform(input, {
            description: CityTransformer.normalizeDescription,
            state: StateTransformer.normalizeDescription,
            status: StatusTransformer.normalizeDescription,
        });
    }

    @LogError()
    protected async validateForeignKeys(data: Partial<CityDtoBaseType["DTO"]>): Promise<void> {
        await Promise.all([
            this.validateExistence("state", data.state, 'description', this.stateService),
            this.validateStatusExistence(data.status),
        ]);
    }

    //#endregion
}
