import {inject, injectable} from "tsyringe";
import {ICityRepository} from "@location/infrastructure/repositories/interfaces/ICity.repository";
import {EntityUniquenessValidator} from "@coreShared/validators/entityUniqueness.validator";
import {CityEntity} from "@location/domain/entities/city.entity";
import {CityModel} from "@location/infrastructure/models/city.model";
import {CityCreateDTO, CityDTO, CityFilterDTO} from "@location/adapters/dtos/city.dto";
import {EntityUniquenessValidatorFactory} from "@coreShared/factories/entityUniquenessValidator.factory";
import {IBaseRepository} from "@coreShared/interfaces/IBaseRepository";
import {LogError} from "@coreShared/decorators/LogError";
import {Transaction} from "sequelize";
import {StatusEntity} from "@status/domain/entities/status.entity";
import {CityTransformer} from "@location/domain/transformers/city.transform";
import {ResultType} from "@coreShared/types/result.type";
import {NotFoundError} from "@coreShared/errors/domain.error";
import {EntitiesMessage} from "@coreShared/messages/entities.message";
import {CreateResultType, UpdateResultType} from "@coreShared/types/crudResult.type";
import {StringUtil} from "@coreShared/utils/string.util";
import {FindAllType} from "@coreShared/types/findAll.type";
import {StatusTransformer} from "@status/domain/transformers/Status.transformer";
import {ServiceError} from "@coreShared/errors/service.error";
import {ICityService} from "@location/domain/services/interfaces/ICity.service";
import {IStatusService} from "@status/domain/services/interfaces/IStatus.service";

@injectable()
export class CityService implements ICityService {
    //#region PROPERTIES
    private readonly uniquenessValidator: EntityUniquenessValidator<CityEntity, CityModel, CityDTO>;
    private readonly CITY: string = CityEntity.ENTITY_NAME;
    //#endregion

    //#region CONSTRUCTOR
    constructor(
        @inject("ICityRepository") private readonly repo: ICityRepository,
        @inject("EntityUniquenessValidatorFactory") validatorFactory: EntityUniquenessValidatorFactory,
        @inject("CityRepository") cityRepo: IBaseRepository<CityEntity, CityModel, CityDTO>,
        @inject('IStatusService') private readonly statusService: IStatusService,
    ) {
        this.uniquenessValidator = validatorFactory(cityRepo);
    }

    //#endregion

    @LogError()
    async createOrGetCity(data: CityCreateDTO, transaction: Transaction): Promise<CreateResultType<CityEntity>> {
        const status: StatusEntity = await this.statusService.getStatusForNewEntities();
        const statusId: number = status.id!;

        const entity: CityEntity = CityEntity.create({
            description: data.description,
            stateId: data.stateId,
            statusId: statusId,
        })

        const isUnique: boolean = await this.uniquenessValidator.validate('description', entity.description);

        if (!isUnique) {
            const cityFilter: CityFilterDTO = {
                description: StringUtil.parseCsvFilter(entity.description, String),
                stateId: StringUtil.parseCsvFilter(entity.stateId.toString(), Number)
            };

            const existing: CityEntity | null = await this.get(cityFilter);
            return {entity: existing!, created: false};
        }

        const created: CityEntity = (await this.repo.create(entity, transaction)).unwrapOrThrow();

        return {entity: created, created: true};
    }

    @LogError()
    async get(filter: CityFilterDTO): Promise<CityEntity | null> {
        if (filter.description) {
            filter.description = CityTransformer.normalizeDescription(filter.description[0]);
        }

        const found: ResultType<CityEntity | null> = await this.repo.findOneByFilter(filter);

        if (!found.isSuccess()) throw new NotFoundError(EntitiesMessage.error.retrieval.notFound(this.CITY));

        return found.unwrapOrNull();
    }

    @LogError()
    async getById(id: number): Promise<CityEntity | null> {
        return (await this.repo.findById(id)).unwrapOrNull();
    }

    @LogError()
    async getAll(filter: CityFilterDTO, page?: number, limit?: number): Promise<FindAllType<CityEntity>> {
        const pageValue: number = page ?? 1;
        const limitValue: number = limit ?? 20;
        const offset: number = (pageValue - 1) * limitValue;

        if (filter?.description) {
            filter.description = StringUtil.toArray(filter.description).map(StatusTransformer.normalizeDescription);
        }

        const found: ResultType<FindAllType<CityEntity>> = await this.repo.findMany(limitValue, offset, filter);

        if (!found.isSuccess()) throw new NotFoundError(EntitiesMessage.error.retrieval.notFound(this.CITY));

        return found.unwrap();
    }

    @LogError()
    async updateProperties(currentCity: CityEntity, properties: CityDTO, transaction: Transaction): Promise<UpdateResultType<CityEntity>> {
        let updatedCity: CityEntity = currentCity.withProps(properties);

        const shouldUpdateStatus: boolean = updatedCity.statusId !== currentCity.statusId;
        const shouldUpdateDescription: boolean = updatedCity.description !== currentCity.description;
        const shouldUpdateStateId: boolean = updatedCity.stateId !== currentCity.stateId;

        if (!shouldUpdateStatus && !shouldUpdateDescription && !shouldUpdateStateId) {
            return {entity: currentCity, updated: false};
        }

        if (shouldUpdateDescription || shouldUpdateStateId) {
            const pendingApprovalStatus: StatusEntity = await this.statusService.getStatusForUpdateEntities()
            updatedCity = updatedCity.updateProps({statusId: pendingApprovalStatus.id!})
        }

        const updateResult: boolean = (await this.repo.update(updatedCity, transaction)).unwrapOrThrow();

        if (!updateResult) {
            throw new ServiceError(EntitiesMessage.error.failure.update(this.CITY));
        }

        return {entity: updatedCity, updated: true};
    }

    @LogError()
    async deleteCity(id: number, transaction: Transaction): Promise<void> {
        const inactiveId: number = (await this.statusService.getStatusForInactiveEntities()).id!;
        const entity: CityEntity | null = await this.getById(id);
        if(!entity) throw new NotFoundError(EntitiesMessage.error.retrieval.notFound(this.CITY));
        await this.updateProperties(entity, {statusId: inactiveId}, transaction);
    }
}
