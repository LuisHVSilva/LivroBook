import {inject, injectable} from "tsyringe";
import {ICountryRepository} from "@location/infrastructure/repositories/interfaces/ICountry.repository";
import {EntityUniquenessValidatorFactory} from "@coreShared/factories/entityUniquenessValidator.factory";
import {EntityUniquenessValidator} from "@coreShared/validators/entityUniqueness.validator";
import {CountryEntity} from "@location/domain/entities/country.entity";
import {IRepositoryBase} from "@coreShared/base/interfaces/IRepositoryBase";
import {ConflictError} from "@coreShared/errors/classes.error";
import {EntitiesMessage} from "@coreShared/messages/entities.message";
import {ICountryService} from "@location/domain/services/interfaces/ICountry.service";
import {IStatusService} from "@status/domain/services/interfaces/IStatus.service";
import {ServiceBase} from "@coreShared/base/service.base";
import {CountryTransformer} from "@location/domain/transformers/country.transform";
import {CountryBaseRepositoryType, CountryDtoBaseType} from "@location/adapters/dtos/country.dto";
import {StringUtil} from "@coreShared/utils/string.util";
import {StatusTransformer} from "@status/domain/transformers/Status.transformer";


@injectable()
export class CountryService extends ServiceBase<CountryDtoBaseType, CountryEntity> implements ICountryService {
    //#region PROPERTIES
    private readonly uniquenessValidator: EntityUniquenessValidator<CountryBaseRepositoryType>;
    private readonly COUNTRY: string = CountryEntity.ENTITY_NAME;
    //#endregion

    //#region CONSTRUCTOR
    constructor(
        @inject("ICountryRepository")
        protected readonly repo: ICountryRepository,
        @inject("EntityUniquenessValidatorFactory")
        private readonly validatorFactory: EntityUniquenessValidatorFactory,
        @inject("CountryRepository")
        protected readonly countryRepo: IRepositoryBase<CountryBaseRepositoryType>,
        @inject('IStatusService')
        protected readonly statusService: IStatusService,
    ) {
        super(repo, CountryEntity, statusService);
        this.uniquenessValidator = this.validatorFactory(this.countryRepo);
    }

    //#endregion

    //#region HELPERS

    protected async createEntity(data: CountryDtoBaseType["CreateDTO"], status: string): Promise<CountryEntity> {
        return CountryEntity.create({
            description: data.description,
            status
        });
    }


    protected async uniquenessValidatorEntity(entity: CountryEntity, previousEntity?: CountryEntity): Promise<void> {
        const isUnique: boolean = await this.uniquenessValidator.validate('description', entity.description, previousEntity);

        if (!isUnique) throw new ConflictError(EntitiesMessage.error.conflict.duplicateValue(this.COUNTRY, 'description'));
    }


    protected filterTransform(input: CountryDtoBaseType['FilterDTO']): CountryDtoBaseType['FilterDTO'] {
        return StringUtil.applyFilterTransform(input, {
            description: CountryTransformer.normalizeDescription,
            status: StatusTransformer.normalizeDescription,
        });
    }


    protected async validateForeignKeys(data: Partial<CountryDtoBaseType["DTO"]>): Promise<void> {
        await this.validateStatusExistence(data.status);
    }

    //#endregion
}
