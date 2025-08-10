import {inject, injectable} from "tsyringe";
import {ICountryRepository} from "@location/infrastructure/repositories/interfaces/ICountry.repository";
import {EntityUniquenessValidatorFactory} from "@coreShared/factories/entityUniquenessValidator.factory";
import {EntityUniquenessValidator} from "@coreShared/validators/entityUniqueness.validator";
import {CountryEntity} from "@location/domain/entities/country.entity";
import {CountryModel} from "@location/infrastructure/models/country.model";
import {CountryDTO, CountryFilterDTO} from "@location/adapters/dtos/country.dto";
import {IBaseRepository} from "@coreShared/interfaces/IBaseRepository";
import {LogError} from "@coreShared/decorators/LogError";
import {Transaction} from "sequelize";
import {CountryTransformer} from "@location/domain/transformers/country.transform";
import {StringUtil} from "@coreShared/utils/string.util";
import {ResultType} from "@coreShared/types/result.type";
import {NotFoundError} from "@coreShared/errors/domain.error";
import {EntitiesMessage} from "@coreShared/messages/entities.message";
import {StatusEntity} from "@status/domain/entities/status.entity";
import {CreateResultType, UpdateResultType} from "@coreShared/types/crudResult.type";
import {StatusTransformer} from "@status/domain/transformers/Status.transformer";
import {FindAllType} from "@coreShared/types/findAll.type";
import {ServiceError} from "@coreShared/errors/service.error";
import {ICountryService} from "@location/domain/services/interfaces/ICountry.service";
import {IStatusService} from "@status/domain/services/interfaces/IStatus.service";


@injectable()
export class CountryService implements ICountryService {
    //#region PROPERTIES
    private readonly uniquenessValidator: EntityUniquenessValidator<CountryEntity, CountryModel, CountryDTO>;
    private readonly COUNTRY: string = CountryEntity.ENTITY_NAME;
    //#endregion

    //#region CONSTRUCTOR
    constructor(
        @inject("ICountryRepository") private readonly repo: ICountryRepository,
        @inject("EntityUniquenessValidatorFactory") validatorFactory: EntityUniquenessValidatorFactory,
        @inject("CountryRepository") countryRepo: IBaseRepository<CountryEntity, CountryModel, CountryDTO>,
        @inject('IStatusService') private readonly statusService: IStatusService,
    ) {
        this.uniquenessValidator = validatorFactory(countryRepo);
    }

    //#endregion

    @LogError()
    async createOrGetCountry(description: string, transaction: Transaction): Promise<CreateResultType<CountryEntity>> {
        const status: StatusEntity = await this.statusService.getStatusForNewEntities();
        const statusId: number = status.id!;
        const entity: CountryEntity = CountryEntity.create({description, statusId});
        const isUnique: boolean = await this.uniquenessValidator.validate('description', entity.description);

        if (!isUnique) {
            const descriptionFilter: CountryFilterDTO = {
                description: StringUtil.parseCsvFilter(entity.description, String)
            };

            const existing: CountryEntity | null = await this.get(descriptionFilter);
            return {entity: existing!, created: false};
        }

        const created: CountryEntity = (await this.repo.create(entity, transaction)).unwrapOrThrow();

        return {entity: created, created: true};
    }


    @LogError()
    async get(filter: CountryFilterDTO): Promise<CountryEntity | null> {
        if (filter.description) {
            filter.description = CountryTransformer.normalizeDescription(filter.description[0]);
        }

        const found: ResultType<CountryEntity | null> = await this.repo.findOneByFilter(filter);

        if (!found.isSuccess()) throw new NotFoundError(EntitiesMessage.error.retrieval.notFound(this.COUNTRY));

        return found.unwrapOrNull();
    }

    @LogError()
    async getById(id: number): Promise<CountryEntity | null> {
        return (await this.repo.findById(id)).unwrapOrNull();
    }

    @LogError()
    async getAll(filter?: CountryFilterDTO, page?: number, limit?: number): Promise<FindAllType<CountryEntity>> {
        const pageValue: number = page ?? 1;
        const limitValue: number = limit ?? 20;
        const offset: number = (pageValue - 1) * limitValue;

        if (filter?.description) {
            filter.description = StringUtil.toArray(filter.description).map(StatusTransformer.normalizeDescription);
        }

        const found: ResultType<FindAllType<CountryEntity>> = await this.repo.findMany(limitValue, offset, filter);

        if (!found.isSuccess()) throw new NotFoundError(EntitiesMessage.error.retrieval.notFound(this.COUNTRY));

        return found.unwrap();
    }

    @LogError()
    async updateProperties(currentCountry: CountryEntity, properties: CountryDTO, transaction: Transaction): Promise<UpdateResultType<CountryEntity>> {
        let updatedCountry: CountryEntity = currentCountry.withProps(properties);

        const shouldUpdateStatus: boolean = updatedCountry.statusId !== currentCountry.statusId;
        const shouldUpdateDescription: boolean = updatedCountry.description !== currentCountry.description;

        if (!shouldUpdateStatus && !shouldUpdateDescription) {
            return {entity: currentCountry, updated: false};
        }

        if (shouldUpdateDescription) {
            const pendingApprovalStatus: StatusEntity = await this.statusService.getStatusForUpdateEntities()
            updatedCountry = updatedCountry.updateProps({statusId: pendingApprovalStatus.id!})
        }

        const updateResult: boolean = (await this.repo.update(updatedCountry, transaction)).unwrapOrThrow();

        if (!updateResult) {
            throw new ServiceError(EntitiesMessage.error.failure.update(this.COUNTRY));
        }

        return {entity: updatedCountry, updated: true};
    }

    @LogError()
    async deleteCountry(id: number, transaction: Transaction): Promise<void> {
        const inactiveId: number = (await this.statusService.getStatusForInactiveEntities()).id!;
        const entity: CountryEntity | null = await this.getById(id);
        if (!entity) throw new NotFoundError(EntitiesMessage.error.retrieval.notFound(this.COUNTRY));
        
        await this.updateProperties(entity, {statusId: inactiveId}, transaction)
    }
}
