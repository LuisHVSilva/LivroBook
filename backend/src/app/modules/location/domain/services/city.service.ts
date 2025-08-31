import {inject, injectable} from "tsyringe";
import {
    CityBaseRepositoryType,
    ICityRepository
} from "@location/infrastructure/repositories/interfaces/ICity.repository";
import {EntityUniquenessValidator} from "@coreShared/validators/entityUniqueness.validator";
import {CityEntity} from "@location/domain/entities/city.entity";
import {CityDTO, CityFilterDTO, CreateCityDTO, UpdateCityDTO} from "@location/adapters/dtos/city.dto";
import {EntityUniquenessValidatorFactory} from "@coreShared/factories/entityUniquenessValidator.factory";
import {IRepositoryBase} from "@coreShared/base/interfaces/IRepositoryBase";
import {LogError} from "@coreShared/decorators/LogError";
import {Transaction} from "sequelize";
import {StatusEntity} from "@status/domain/entities/status.entity";
import {ResultType} from "@coreShared/types/result.type";
import {ConflictError, NotFoundError} from "@coreShared/errors/domain.error";
import {EntitiesMessage} from "@coreShared/messages/entities.message";
import {UpdateResultType} from "@coreShared/types/crudResult.type";
import {StringUtil} from "@coreShared/utils/string.util";
import {FindAllType} from "@coreShared/types/findAll.type";
import {StatusTransformer} from "@status/domain/transformers/Status.transformer";
import {ICityService} from "@location/domain/services/interfaces/ICity.service";
import {IStatusService} from "@status/domain/services/interfaces/IStatus.service";
import {IStateService} from "@location/domain/services/interfaces/IState.service";
import {DeleteStatusEnum} from "@coreShared/enums/deleteStatus.enum";
import {DeleteReport} from "@coreShared/utils/operationReport.util";

@injectable()
export class CityService implements ICityService {
    //#region PROPERTIES
    private readonly uniquenessValidator: EntityUniquenessValidator<CityBaseRepositoryType>;
    private readonly CITY: string = CityEntity.ENTITY_NAME;
    //#endregion

    //#region CONSTRUCTOR
    constructor(
        @inject("ICityRepository") private readonly repo: ICityRepository,
        @inject("EntityUniquenessValidatorFactory") validatorFactory: EntityUniquenessValidatorFactory,
        @inject("CityRepository") cityRepo: IRepositoryBase<CityBaseRepositoryType>,
        @inject('IStatusService') private readonly statusService: IStatusService,
        @inject("IStateService") private readonly stateService: IStateService,
    ) {
        this.uniquenessValidator = validatorFactory(cityRepo);
    }

    //#endregion

    //#region CREATE
    @LogError()
    async create(data: CreateCityDTO, transaction: Transaction): Promise<CityEntity> {
        const status: StatusEntity = await this.statusService.getStatusForNewEntities();
        const statusId: number = status.id!;

        const entity: CityEntity = CityEntity.create({
            description: data.description,
            stateId: data.stateId,
            statusId: statusId,
        })

        await this.validateForeignKeys(entity);

        const isUnique: boolean = await this.uniquenessValidator.validate('description', entity.description);

        if (!isUnique) {
            throw new ConflictError(EntitiesMessage.error.conflict.duplicateValue(this.CITY, 'description'))
        }

        return (await this.repo.create(entity, transaction)).unwrapOrThrow();
    }

    //#endregion

    //#region READ
    @LogError()
    async getById(id: number): Promise<CityEntity> {
        const found: ResultType<CityEntity> = await this.repo.findById(id);
        const entity: CityEntity | null = found.unwrapOrNull();

        if (!entity) {
            throw new NotFoundError(EntitiesMessage.error.retrieval.notFound(this.CITY));
        }

        return entity;
    }

    @LogError()
    async findMany(filter: CityFilterDTO, page?: number, limit?: number): Promise<FindAllType<CityEntity>> {
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

    //#endregion

    //#region UPDATE
    @LogError()
    async update(newData: UpdateCityDTO, transaction: Transaction): Promise<UpdateResultType<CityEntity>> {
        const entity: CityEntity = await this.getById(newData.id);

        let updatedEntity: CityEntity = entity.update(newData);

        if (updatedEntity.isEqual(entity)) {
            return {entity: entity, updated: false};
        }

        await this.validateForeignKeys(updatedEntity);

        if (updatedEntity.hasDifferencesExceptStatus(entity)) {
            if(newData.description !== entity.description) {
                const isUnique: boolean = await this.uniquenessValidator.validate('description', newData.description!);
                if (!isUnique) {
                    throw new ConflictError(EntitiesMessage.error.conflict.duplicateValue(this.CITY, "description"));
                }
            }

            const updatedStatusId: number = (await this.statusService.getStatusForNewEntities()).id!;
            updatedEntity = updatedEntity.update({statusId: updatedStatusId});
        }

        const updated: ResultType<CityEntity> = await this.repo.update(updatedEntity, transaction);

        return {entity: updated.unwrapOrThrow(), updated: true};
    }
    //#endregion

    //#region DELETE
    @LogError()
    async delete(id: number, transaction: Transaction): Promise<DeleteStatusEnum> {
        let entity: CityEntity;

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

        const deletedEntity = entity.update({ statusId: inactiveStatus.id });
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
    private async validateForeignKeys(data: Partial<CityDTO>): Promise<void> {
        const validateExistence = async <T>(
            field: keyof CityDTO,
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
}
