import {inject, injectable} from "tsyringe";
import {ICityRepository} from "@location/infrastructure/repositories/interfaces/ICity.repository";
import {EntityUniquenessValidator} from "@coreShared/validators/entityUniqueness.validator";
import {CityEntity} from "@location/domain/entities/city.entity";
import {EntityUniquenessValidatorFactory} from "@coreShared/factories/entityUniquenessValidator.factory";
import {IRepositoryBase} from "@coreShared/base/interfaces/IRepositoryBase";
import {LogError} from "@coreShared/decorators/LogError";
import {ConflictError, NotFoundError} from "@coreShared/errors/domain.error";
import {EntitiesMessage} from "@coreShared/messages/entities.message";
import {ICityService} from "@location/domain/services/interfaces/ICity.service";
import {IStatusService} from "@status/domain/services/interfaces/IStatus.service";
import {IStateService} from "@location/domain/services/interfaces/IState.service";
import {ServiceBase} from "@coreShared/base/service.base";
import {CityTransformer} from "@location/domain/transformers/city.transform";
import {CityBaseRepositoryType, CityDtoBaseType} from "@location/adapters/dtos/city.dto";

@injectable()
export class CityService extends ServiceBase<CityDtoBaseType, CityEntity> implements ICityService {
    //#region PROPERTIES
    private readonly uniquenessValidator: EntityUniquenessValidator<CityBaseRepositoryType>;
    private readonly CITY: string = CityEntity.ENTITY_NAME;
    //#endregion

    //#region CONSTRUCTOR
    constructor(
        @inject("ICityRepository") protected readonly repo: ICityRepository,
        @inject("EntityUniquenessValidatorFactory") private readonly validatorFactory: EntityUniquenessValidatorFactory,
        @inject("CityRepository") private readonly cityRepo: IRepositoryBase<CityBaseRepositoryType>,
        @inject('IStatusService') protected readonly statusService: IStatusService,
        @inject("IStateService") private readonly stateService: IStateService,
    ) {
        super(repo, CityEntity, statusService);
        this.uniquenessValidator = this.validatorFactory(this.cityRepo);
    }

    //#endregion

    //#region HELPERS
    @LogError()
    protected async createEntity(data: CityDtoBaseType["CreateDTO"], statusId: number): Promise<CityEntity> {
        return CityEntity.create({
            description: data.description,
            stateId: data.stateId,
            statusId
        });
    }

    @LogError()
    protected async uniquenessValidatorEntity(entity: CityEntity): Promise<void> {
        const isUnique: boolean = await this.uniquenessValidator.validate('description', entity.description);

        if (!isUnique) {
            throw new ConflictError(EntitiesMessage.error.conflict.duplicateValue(this.CITY, 'description'));
        }
    }

    @LogError()
    protected filterTransform(input: CityDtoBaseType['FilterDTO']): CityDtoBaseType['FilterDTO'] {
        const transformedFilter: CityDtoBaseType['FilterDTO'] = {...input};

        if (input.description !== undefined) {
            transformedFilter.description = input.description.map(desc =>
                CityTransformer.normalizeDescription(desc)
            );
        }

        return transformedFilter;
    }

    @LogError()
    protected async validateForeignKeys(data: Partial<CityDtoBaseType["DTO"]>): Promise<void> {
        const validateExistence = async <T>(
            field: keyof CityDtoBaseType["DTO"],
            id: number | undefined,
            service: { getById: (id: number) => Promise<T | null> }
        ): Promise<void> => {
            if (id == null) return;
            if (!(await service.getById(id))) {
                throw new NotFoundError(EntitiesMessage.error.retrieval.notFoundForeignKey(field, id));
            }
        };

        await Promise.all([
            validateExistence("stateId", data.stateId, this.stateService),
            validateExistence("statusId", data.statusId, this.statusService)
        ]);
    }

    @LogError()
    protected async handleBusinessRules(oldEntity: CityEntity, newEntity: CityEntity): Promise<void> {
        if (newEntity.description !== oldEntity.description) {
            await this.uniquenessValidatorEntity(newEntity);
        }
    }
    //#endregion
}
