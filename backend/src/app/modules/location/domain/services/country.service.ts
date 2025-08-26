import {inject, injectable} from "tsyringe";
import {ICountryRepository} from "@location/infrastructure/repositories/interfaces/ICountry.repository";
import {EntityUniquenessValidatorFactory} from "@coreShared/factories/entityUniquenessValidator.factory";
import {EntityUniquenessValidator} from "@coreShared/validators/entityUniqueness.validator";
import {CountryEntity} from "@location/domain/entities/country.entity";
import {CountryModel} from "@location/infrastructure/models/country.model";
import {CountryDTO, CountryFilterDTO, CreateCountryDTO, UpdateCountryDTO} from "@location/adapters/dtos/country.dto";
import {IBaseRepository} from "@coreShared/interfaces/IBaseRepository";
import {LogError} from "@coreShared/decorators/LogError";
import {Transaction} from "sequelize";
import {StringUtil} from "@coreShared/utils/string.util";
import {ResultType} from "@coreShared/types/result.type";
import {ConflictError, NotFoundError} from "@coreShared/errors/domain.error";
import {EntitiesMessage} from "@coreShared/messages/entities.message";
import {StatusEntity} from "@status/domain/entities/status.entity";
import {UpdateResultType} from "@coreShared/types/crudResult.type";
import {StatusTransformer} from "@status/domain/transformers/Status.transformer";
import {FindAllType} from "@coreShared/types/findAll.type";
import {ServiceError} from "@coreShared/errors/service.error";
import {ICountryService} from "@location/domain/services/interfaces/ICountry.service";
import {IStatusService} from "@status/domain/services/interfaces/IStatus.service";
import {DeleteStatusEnum} from "@coreShared/enums/deleteStatus.enum";
import {DeleteReport} from "@coreShared/utils/operationReport.util";


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

    //#region CREATE
    @LogError()
    async create(data: CreateCountryDTO, transaction: Transaction): Promise<CountryEntity> {
        const status: StatusEntity = await this.statusService.getStatusForNewEntities();
        const statusId: number = status.id!;

        const entity: CountryEntity = CountryEntity.create({
            description: data.description,
            statusId
        });

        const isUnique: boolean = await this.uniquenessValidator.validate('description', entity.description);

        if (!isUnique) {
            throw new ConflictError(EntitiesMessage.error.conflict.duplicateValue(this.COUNTRY, 'description'))
        }

        return (await this.repo.create(entity, transaction)).unwrapOrThrow();
    }

    //#endregion

    //#region READ
    @LogError()
    async getById(id: number): Promise<CountryEntity> {
        const found: ResultType<CountryEntity> = await this.repo.findById(id);
        const entity: CountryEntity | null = found.unwrapOrNull();

        if (!entity) {
            throw new NotFoundError(EntitiesMessage.error.retrieval.notFound(this.COUNTRY));
        }

        return entity;
    }

    @LogError()
    async findMany(filter?: CountryFilterDTO, page?: number, limit?: number): Promise<FindAllType<CountryEntity>> {
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

    //#endregion

    //#region UPDATE
    @LogError()
    async update(newData: UpdateCountryDTO, transaction: Transaction): Promise<UpdateResultType<CountryEntity>> {
        const entity: CountryEntity = await this.getById(newData.id);

        let updatedEntity: CountryEntity = entity.updateProps(newData);

        if (updatedEntity.isEqual(entity)) {
            return {entity: entity, updated: false};
        }

        if (updatedEntity.statusId !== entity.statusId) {
            await this.validateForeignKeys(updatedEntity);
        }

        if (updatedEntity.hasDifferencesExceptStatus(entity)) {
            const isUnique: boolean = await this.uniquenessValidator.validate('description', newData.description!);
            if (!isUnique) {
                throw new ConflictError(EntitiesMessage.error.conflict.duplicateValue(this.COUNTRY, "description"));
            }

            const updatedStatusId: number = (await this.statusService.getStatusForNewEntities()).id!;
            updatedEntity = updatedEntity.updateProps({statusId: updatedStatusId});
        }

        const updated: ResultType<boolean> = await this.repo.update(updatedEntity, transaction);
        if (!updated.isSuccess()) {
            throw new ServiceError(EntitiesMessage.error.failure.update(this.COUNTRY));
        }

        return {entity: updatedEntity, updated: true};
    }
    //#endregion

    //#region DELETE
    @LogError()
    async delete(id: number, transaction: Transaction): Promise<DeleteStatusEnum> {
        let entity: CountryEntity;

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

        const deletedEntity = entity.updateProps({ statusId: inactiveStatus.id });
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
    private async validateForeignKeys(data: Partial<CountryDTO>): Promise<void> {
        const validateExistence = async <T>(
            field: keyof CountryDTO,
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
}
