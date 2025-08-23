import {inject, injectable} from "tsyringe";
import {IStatusService} from "@status/domain/services/interfaces/IStatus.service";
import {LogError} from "@coreShared/decorators/LogError";
import {Transaction} from "sequelize";
import {UpdateResultType} from "@coreShared/types/crudResult.type";
import {DeleteReport} from "@coreShared/utils/operationReport.util";
import {StatusEntity} from "@status/domain/entities/status.entity";
import {ConflictError, NotFoundError} from "@coreShared/errors/domain.error";
import {EntitiesMessage} from "@coreShared/messages/entities.message";
import {FindAllType} from "@coreShared/types/findAll.type";
import {ResultType} from "@coreShared/types/result.type";
import {EntityUniquenessValidator} from "@coreShared/validators/entityUniqueness.validator";
import {EntityUniquenessValidatorFactory} from "@coreShared/factories/entityUniquenessValidator.factory";
import {IBaseRepository} from "@coreShared/interfaces/IBaseRepository";
import {PhoneEntity} from "@phone/domain/entities/phone.entity";
import {PhoneModel} from "@phone/infrastructure/models/phone.model";
import {CreatePhoneDTO, PhoneDTO, PhoneFilterDTO, UpdatePhoneDTO} from "@phone/adapters/dtos/phone.dto";
import {IPhoneService} from "@phone/domain/service/interfaces/IPhone.service";
import {IPhoneRepository} from "@phone/infrastructure/repositories/interface/IPhone.repository";
import {IPhoneCodeService} from "@phone/domain/service/interfaces/IPhoneCode.service";
import {IPhoneTypeService} from "@phone/domain/service/interfaces/IPhoneType.service";
import {DeleteStatusEnum} from "@coreShared/enums/deleteStatus.enum";

@injectable()
export class PhoneService implements IPhoneService {
    //#region PROPERTIES
    private readonly uniquenessValidator: EntityUniquenessValidator<PhoneEntity, PhoneModel, PhoneDTO>;
    private readonly PHONE: string = PhoneEntity.ENTITY_NAME;
    //#endregion

    //#region CONSTRUCTOR
    constructor(
        @inject("IPhoneRepository") private readonly repo: IPhoneRepository,
        @inject("EntityUniquenessValidatorFactory") validatorFactory: EntityUniquenessValidatorFactory,
        @inject("PhoneRepository") phoneRepository: IBaseRepository<PhoneEntity, PhoneModel, PhoneDTO>,
        @inject('IStatusService') private readonly statusService: IStatusService,
        @inject("IPhoneCodeService") private readonly phoneCodeService: IPhoneCodeService,
        @inject("IPhoneTypeService") private readonly phoneTypeService: IPhoneTypeService,
    ) {
        this.uniquenessValidator = validatorFactory(phoneRepository);
    }

    //#endregion

    //#region CREATE
    @LogError()
    async create(data: CreatePhoneDTO, transaction: Transaction): Promise<PhoneEntity> {
        const status: StatusEntity = await this.statusService.getStatusForNewEntities();
        const statusId: number = status.id!;

        const entity: PhoneEntity = PhoneEntity.create({
            number: data.number,
            phoneCodeId: data.phoneCodeId,
            phoneTypeId: data.phoneTypeId,
            statusId: statusId
        });

        await this.validateForeignKeys(entity);
        const isUnique: boolean = await this.uniquenessValidator.validate('number', entity.number);

        if (!isUnique) {
            throw new ConflictError(EntitiesMessage.error.conflict.duplicateValue("PHONE", "number"));
        }

        return (await this.repo.create(entity, transaction)).unwrapOrThrow();
    }
    //#endregion

    //#region READ
    @LogError()
    async getById(id: number): Promise<PhoneEntity> {
        const found: ResultType<PhoneEntity> = await this.repo.findById(id);
        const entity: PhoneEntity | null = found.unwrapOrNull();

        if (!entity) throw new NotFoundError(EntitiesMessage.error.retrieval.notFound(this.PHONE));

        return entity;
    }

    @LogError()
    async findMany(filter?: PhoneFilterDTO, page?: number, limit?: number): Promise<FindAllType<PhoneEntity>> {
        const pageValue: number = page ?? 1;
        const limitValue: number = limit ?? 20;
        const offset: number = (pageValue - 1) * limitValue;

        const found: ResultType<FindAllType<PhoneEntity>> = await this.repo.findMany(limitValue, offset, filter);

        if (!found.isSuccess()) throw new NotFoundError(EntitiesMessage.error.retrieval.notFound(this.PHONE));

        return found.unwrap();
    }
    //#endregion

    //#region UPDATE
    @LogError()
    async update(newData: UpdatePhoneDTO, transaction: Transaction): Promise<UpdateResultType<PhoneEntity>> {
        const entity: PhoneEntity = await this.getById(newData.id!);

        let updatedEntity: PhoneEntity = entity.update({
            number: newData.number ?? entity.number,
            phoneCodeId: newData.phoneCodeId ?? entity.phoneCodeId,
            phoneTypeId: newData.phoneTypeId ?? entity.phoneTypeId,
            statusId: newData.statusId ?? entity.statusId,
        });

        await this.validateForeignKeys(updatedEntity);

        if (updatedEntity.isEqual(entity)) {
            return { entity: entity, updated: false };
        }
        
        if (newData.number) {
            const isUnique: boolean = await this.uniquenessValidator.validate('number', updatedEntity.number);

            if (!isUnique) {
                throw new ConflictError(EntitiesMessage.error.conflict.duplicateValue("PHONE", "number"));
            }
        }

        if (newData.number || newData.phoneCodeId || newData.phoneTypeId) {
            updatedEntity = updatedEntity.update({statusId: (await this.statusService.getStatusForNewEntities()).id!});
        }

        const updated: ResultType<boolean> = await this.repo.update(updatedEntity, transaction);

        if (!updated.isSuccess()) throw new Error(EntitiesMessage.error.failure.update(this.PHONE));

        return {entity: updatedEntity, updated: updated.unwrap()};
    }
    //#endregion

    //#region DELETE
    @LogError()
    async delete(id: number, transaction: Transaction): Promise<DeleteStatusEnum> {
        const entity: PhoneEntity = await this.getById(id);
        const inactiveStatus: StatusEntity = await this.statusService.getStatusForInactiveEntities();

        if (entity.statusId === inactiveStatus.id) {
            return DeleteStatusEnum.ALREADY_INACTIVE;
        }

        const deletedEntity: PhoneEntity = entity.update({statusId: inactiveStatus.id});
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
            const entity: PhoneEntity | null = await this.getById(id);

            if (!entity) {
                notFound.push(id);
                continue;
            }

            if (entity.statusId === inactiveStatus.id) {
                alreadyInactive.push(id);
                continue;
            }

            const deletedEntity: PhoneEntity = entity.update({statusId: inactiveStatus.id});
            await this.repo.update(deletedEntity, transaction);
            deleted.push(id);
        }

        return {deleted, alreadyInactive, notFound};
    }
    //#endregion

    @LogError()
    private async validateForeignKeys(data: Partial<PhoneDTO>): Promise<void> {
        const validateExistence = async <T>(
            field: keyof PhoneDTO,
            id: number | undefined,
            service: { getById: (id: number) => Promise<T | null> }
        ): Promise<void> => {
            if (id == null) return;
            if (!(await service.getById(id))) {
                throw new NotFoundError(EntitiesMessage.error.retrieval.notFoundForeignKey(field, id));
            }
        };

        await Promise.all([
            validateExistence("phoneCodeId", data.phoneCodeId, this.phoneCodeService),
            validateExistence("phoneTypeId", data.phoneTypeId, this.phoneTypeService),
            validateExistence("statusId", data.statusId, this.statusService)
        ]);
    }
}