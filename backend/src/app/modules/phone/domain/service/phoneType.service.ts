import {inject, injectable} from "tsyringe";
import {IPhoneTypeService} from "@phone/domain/service/interfaces/IPhoneType.service";
import {EntityUniquenessValidator} from "@coreShared/validators/entityUniqueness.validator";
import {EntityUniquenessValidatorFactory} from "@coreShared/factories/entityUniquenessValidator.factory";
import {IBaseRepository} from "@coreShared/interfaces/IBaseRepository";
import {IStatusService} from "@status/domain/services/interfaces/IStatus.service";
import {PhoneTypeEntity} from "@phone/domain/entities/phoneType.entity";
import {PhoneTypeModel} from "@phone/infrastructure/models/phoneType.model";
import {
    CreatePhoneTypeDTO,
    PhoneTypeDTO,
    PhoneTypeFilterDTO,
    UpdatePhoneTypeDTO
} from "@phone/adapters/dtos/phoneType.dto";
import {IPhoneTypeRepository} from "@phone/infrastructure/repositories/interface/IPhoneType.repository";
import {LogError} from "@coreShared/decorators/LogError";
import {Transaction} from "sequelize";
import {UpdateResultType} from "@coreShared/types/crudResult.type";
import {StatusEntity} from "@status/domain/entities/status.entity";
import {ConflictError, NotFoundError} from "@coreShared/errors/domain.error";
import {EntitiesMessage} from "@coreShared/messages/entities.message";
import {FindAllType} from "@coreShared/types/findAll.type";
import {StringUtil} from "@coreShared/utils/string.util";
import {DocumentTypeTransform} from "@document/domain/transformers/documentType.transform";
import {ResultType} from "@coreShared/types/result.type";
import {DeleteStatusEnum} from "@coreShared/enums/deleteStatus.enum";
import {DeleteReport} from "@coreShared/utils/operationReport.util";

@injectable()
export class PhoneTypeService implements IPhoneTypeService {
    //#region PROPERTIES
    private readonly uniquenessValidator: EntityUniquenessValidator<PhoneTypeEntity, PhoneTypeModel, PhoneTypeDTO>;
    private readonly DESCRIPTION: string = 'description';
    private readonly PHONE_TYPE: string = PhoneTypeEntity.ENTITY_NAME;
    //#endregion

    //#region CONSTRUCTOR
    constructor(
        @inject("IPhoneTypeRepository") private readonly repo: IPhoneTypeRepository,
        @inject("EntityUniquenessValidatorFactory") validatorFactory: EntityUniquenessValidatorFactory,
        @inject("PhoneTypeRepository") phoneTypeRepository: IBaseRepository<PhoneTypeEntity, PhoneTypeModel, PhoneTypeDTO>,
        @inject('IStatusService') private readonly statusService: IStatusService,
    ) {
        this.uniquenessValidator = validatorFactory(phoneTypeRepository);
    }

    //#endregion

    //#region CREATE
    @LogError()
    async create(data: CreatePhoneTypeDTO, transaction: Transaction): Promise<PhoneTypeEntity> {
        const status: StatusEntity = await this.statusService.getStatusForNewEntities();
        const statusId: number = status.id!;

        const entity: PhoneTypeEntity = PhoneTypeEntity.create({
            description: data.description,
            statusId: statusId
        });

        const isUnique: boolean = await this.uniquenessValidator.validate('description', entity.description);

        if (!isUnique) {
            throw new ConflictError(EntitiesMessage.error.conflict.duplicateValue(this.PHONE_TYPE, this.DESCRIPTION));
        }

        return (await this.repo.create(entity, transaction)).unwrapOrThrow();
    }

    //#endregion

    //#region READ
    @LogError()
    async getById(id: number): Promise<PhoneTypeEntity> {
        const found: ResultType<PhoneTypeDTO> = await this.repo.findById(id);
        const entity: PhoneTypeEntity | null = found.unwrapOrNull();

        if (!entity) throw new NotFoundError(EntitiesMessage.error.retrieval.notFound(this.PHONE_TYPE));

        return entity;
    }

    @LogError()
    async findById(id: number): Promise<PhoneTypeEntity | null> {
        const found: ResultType<PhoneTypeEntity> = await this.repo.findById(id);
        return found.unwrapOrNull();
    }

    @LogError()
    async findMany(filter?: PhoneTypeFilterDTO, page?: number, limit?: number): Promise<FindAllType<PhoneTypeEntity>> {
        const pageValue: number = page ?? 1;
        const limitValue: number = limit ?? 20;
        const offset: number = (pageValue - 1) * limitValue;

        if (filter?.description) {
            filter.description = StringUtil.toArray(filter.description).map(DocumentTypeTransform.normalizeDescription);
        }

        const found: ResultType<FindAllType<PhoneTypeEntity>> = await this.repo.findMany(limitValue, offset, filter);

        if (!found.isSuccess()) throw new NotFoundError(EntitiesMessage.error.retrieval.notFound(this.PHONE_TYPE));

        return found.unwrap();
    }

    //#endregion

    //#region UPDATE
    @LogError()
    async update(newData: UpdatePhoneTypeDTO, transaction: Transaction): Promise<UpdateResultType<PhoneTypeEntity>> {
        const entity: PhoneTypeEntity = await this.getById(newData.id!);

        let updatedEntity: PhoneTypeEntity = entity.update({
            description: newData.description ?? entity.description,
            statusId: newData.statusId ?? entity.statusId
        })

        if (updatedEntity.isEqual(entity)) {
            return { entity: entity, updated: false };
        }

        await this.validateForeignKeys(updatedEntity);

        if (updatedEntity.hasDifferencesExceptStatus(entity)) {
            const isUnique: boolean = await this.uniquenessValidator.validate('description', updatedEntity.description);

            if (!isUnique) {
                throw new ConflictError(EntitiesMessage.error.conflict.duplicateValue(this.PHONE_TYPE, this.DESCRIPTION));
            }

            updatedEntity = updatedEntity.update({statusId: (await this.statusService.getStatusForNewEntities()).id!});
        }

        const updated: ResultType<boolean> = await this.repo.update(updatedEntity, transaction);

        if (!updated.isSuccess()) throw new Error(EntitiesMessage.error.failure.update(this.PHONE_TYPE));

        return {entity: updatedEntity, updated: true};
    }

    //#endregion

    //#region DELETE
    @LogError()
    async delete(id: number, transaction: Transaction): Promise<DeleteStatusEnum> {
        const entity: PhoneTypeEntity | null = await this.getById(id);
        const inactiveStatus: StatusEntity = await this.statusService.getStatusForInactiveEntities();

        if (entity.statusId === inactiveStatus.id) {
            return DeleteStatusEnum.ALREADY_INACTIVE;
        }

        const deletedEntity: PhoneTypeEntity = entity.update({statusId: inactiveStatus.id});
        await this.repo.update(deletedEntity, transaction);

        return DeleteStatusEnum.DELETED;
    }

    @LogError()
    async deleteMany(ids: number[], transaction: Transaction): Promise<DeleteReport> {
        const deleted: number[] = [];
        const alreadyInactive: number[] = [];
        const notFound: number[] = [];

        const inactiveStatus: StatusEntity = await this.statusService.getStatusForInactiveEntities();

        for (const id of ids) {
            const entity: PhoneTypeEntity | null = await this.findById(id);

            if (!entity) {
                notFound.push(id);
                continue;
            }

            if (entity.statusId === inactiveStatus.id) {
                alreadyInactive.push(id);
                continue;
            }

            const deletedEntity: PhoneTypeEntity = entity.update({statusId: inactiveStatus.id});
            await this.repo.update(deletedEntity, transaction);
            deleted.push(id);
        }

        return {deleted, alreadyInactive, notFound};
    }

    //#endregion

    @LogError()
    private async validateForeignKeys(data: Partial<PhoneTypeDTO>): Promise<void> {
        const validateExistence = async <T>(
            field: keyof PhoneTypeDTO,
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