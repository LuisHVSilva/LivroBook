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
import {CreateResultType, UpdateResultType} from "@coreShared/types/crudResult.type";
import {StatusEntity} from "@status/domain/entities/status.entity";
import {ConflictError, NotFoundError} from "@coreShared/errors/domain.error";
import {EntitiesMessage} from "@coreShared/messages/entities.message";
import {FindAllType} from "@coreShared/types/findAll.type";
import {StringUtil} from "@coreShared/utils/string.util";
import {DocumentTypeTransform} from "@document/domain/transformers/documentType.transform";
import {ResultType} from "@coreShared/types/result.type";

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

    @LogError()
    async create(data: CreatePhoneTypeDTO, transaction: Transaction): Promise<CreateResultType<PhoneTypeEntity>> {
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

        const created: PhoneTypeEntity = (await this.repo.create(entity, transaction)).unwrapOrThrow();

        return {entity: created, created: true};
    }

    @LogError()
    async getAll(filter?: PhoneTypeFilterDTO, page?: number, limit?: number): Promise<FindAllType<PhoneTypeEntity>> {
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

    @LogError()
    async getById(id: number): Promise<PhoneTypeEntity | null> {
        return (await this.repo.findById(id)).unwrapOrNull() ?? null;
    }

    @LogError()
    async update(newData: UpdatePhoneTypeDTO, transaction: Transaction): Promise<UpdateResultType<PhoneTypeEntity>> {
        const existing: PhoneTypeEntity | null = await this.getById(newData.id!);

        if (!existing) throw new NotFoundError(EntitiesMessage.error.retrieval.notFound(this.PHONE_TYPE));

        let updatedEntity: PhoneTypeEntity = existing.update({
            description: newData.newDescription ?? existing.description,
            statusId: newData.newStatusId ?? existing.statusId
        })

        if (existing.description !== updatedEntity.description) {
            const isUnique: boolean = await this.uniquenessValidator.validate('description', updatedEntity.description);

            if (!isUnique) {
                throw new ConflictError(EntitiesMessage.error.conflict.duplicateValue(this.PHONE_TYPE, this.DESCRIPTION));
            }

            updatedEntity.update({statusId: (await this.statusService.getStatusForNewEntities()).id!});
        }

        const updated: ResultType<boolean> = await this.repo.update(updatedEntity, transaction);

        if (!updated.isSuccess()) throw new Error(EntitiesMessage.error.failure.update(this.PHONE_TYPE));

        return {entity: updatedEntity, updated: updated.unwrap()};
    }

    @LogError()
    async delete(id: number, transaction: Transaction): Promise<void> {
        const entity: PhoneTypeEntity | null = await this.getById(id);
        if (!entity) throw new NotFoundError(EntitiesMessage.error.retrieval.notFound(this.PHONE_TYPE));

        const inactiveStatus: StatusEntity = await this.statusService.getStatusForInactiveEntities();

        if (entity.statusId === inactiveStatus.id) return;

        const deletedEntity: PhoneTypeEntity = entity.update({statusId: inactiveStatus.id});
        await this.repo.update(deletedEntity, transaction);
    }
}