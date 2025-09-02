import {inject, injectable} from "tsyringe";
import {
    CountryBaseRepositoryType,
    ICountryRepository
} from "@location/infrastructure/repositories/interfaces/ICountry.repository";
import {EntityUniquenessValidatorFactory} from "@coreShared/factories/entityUniquenessValidator.factory";
import {EntityUniquenessValidator} from "@coreShared/validators/entityUniqueness.validator";
import {CountryEntity} from "@location/domain/entities/country.entity";
import {IRepositoryBase} from "@coreShared/base/interfaces/IRepositoryBase";
import {LogError} from "@coreShared/decorators/LogError";
import {ConflictError, NotFoundError} from "@coreShared/errors/domain.error";
import {EntitiesMessage} from "@coreShared/messages/entities.message";
import {CountryDtoBaseType, ICountryService} from "@location/domain/services/interfaces/ICountry.service";
import {IStatusService} from "@status/domain/services/interfaces/IStatus.service";
import {ServiceBase} from "@coreShared/base/service.base";
import {CountryTransformer} from "@location/domain/transformers/country.transform";


@injectable()
export class CountryService extends ServiceBase<CountryDtoBaseType, CountryEntity> implements ICountryService {
    //#region PROPERTIES
    private readonly uniquenessValidator: EntityUniquenessValidator<CountryBaseRepositoryType>;
    private readonly COUNTRY: string = CountryEntity.ENTITY_NAME;
    //#endregion

    //#region CONSTRUCTOR
    constructor(
        @inject("ICountryRepository") protected readonly repo: ICountryRepository,
        @inject("EntityUniquenessValidatorFactory") private readonly validatorFactory: EntityUniquenessValidatorFactory,
        @inject("CountryRepository") protected readonly countryRepo: IRepositoryBase<CountryBaseRepositoryType>,
        @inject('IStatusService') protected readonly statusService: IStatusService,
    ) {
        super(repo, CountryEntity, statusService);

        this.uniquenessValidator = this.validatorFactory(this.countryRepo);
    }

    //#endregion

    //#region HELPERS
    @LogError()
    protected createEntity(data: CountryDtoBaseType["CreateDTO"], statusId: number): CountryEntity {
        return CountryEntity.create({
            description: data.description,
            statusId
        });
    }

    @LogError()
    protected async uniquenessValidatorEntity(entity: CountryEntity): Promise<void> {
        const isUnique: boolean = await this.uniquenessValidator.validate('description', entity.description);

        if (!isUnique) throw new ConflictError(EntitiesMessage.error.conflict.duplicateValue(this.COUNTRY, 'description'));
    }

    @LogError()
    protected filterTransform(input: CountryDtoBaseType['FilterDTO']): CountryDtoBaseType['FilterDTO'] {
        const transformedFilter: CountryDtoBaseType['FilterDTO'] = {...input};

        if (input.description !== undefined) {
            if (Array.isArray(input.description)) {
                transformedFilter.description = input.description.map(desc =>
                    CountryTransformer.normalizeDescription(desc)
                );
            } else {
                transformedFilter.description = CountryTransformer.normalizeDescription(input.description);
            }
        }

        return transformedFilter;
    }

    @LogError()
    protected async validateForeignKeys(data: Partial<CountryDtoBaseType["DTO"]>): Promise<void> {
        const validateExistence = async <T>(
            field: keyof CountryDtoBaseType["DTO"],
            id: number | undefined,
            service: { getById: (id: number) => Promise<T | null> }
        ): Promise<void> => {
            if (id == null) return;
            if (!(await service.getById(id))) {
                throw new NotFoundError(EntitiesMessage.error.retrieval.notFoundForeignKey(field, id));
            }
        };

        await Promise.all([
            validateExistence("statusId", data.statusId, this.statusService)
        ]);
    }

    @LogError()
    protected async handleBusinessRules(oldEntity: CountryEntity, newEntity: CountryEntity): Promise<void> {
        if (newEntity.description !== oldEntity.description) {
            await this.uniquenessValidatorEntity(newEntity);
        }
    }

    //#endregion
}
