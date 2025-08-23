import {inject, injectable} from "tsyringe";
import {IPhoneCodeService} from "@phone/domain/service/interfaces/IPhoneCode.service";
import {PhoneCodeEntity} from "@phone/domain/entities/phoneCode.entity";
import {
    CreatePhoneCodeDTO, PhoneCodeDTO,
    PhoneCodeFilterDTO,
    UpdatePhoneCodeDTO
} from "@phone/adapters/dtos/phoneCode.dto";
import {IPhoneCodeRepository} from "@phone/infrastructure/repositories/interface/IPhoneCode.repository";
import {IStatusService} from "@status/domain/services/interfaces/IStatus.service";
import {LogError} from "@coreShared/decorators/LogError";
import {Transaction} from "sequelize";
import {UpdateResultType} from "@coreShared/types/crudResult.type";
import {StatusEntity} from "@status/domain/entities/status.entity";
import {ConflictError, NotFoundError} from "@coreShared/errors/domain.error";
import {EntitiesMessage} from "@coreShared/messages/entities.message";
import {FindAllType} from "@coreShared/types/findAll.type";
import {ResultType} from "@coreShared/types/result.type";
import {IStateService} from "@location/domain/services/interfaces/IState.service";
import {DeleteStatusEnum} from "@coreShared/enums/deleteStatus.enum";
import {DeleteReport} from "@coreShared/utils/operationReport.util";

@injectable()
export class PhoneCodeService implements IPhoneCodeService {
    //#region PROPERTIES
    private readonly PHONE_CODE: string = PhoneCodeEntity.ENTITY_NAME;
    //#endregion

    //#region CONSTRUCTOR
    constructor(
        @inject("IPhoneCodeRepository") private readonly repo: IPhoneCodeRepository,
        @inject('IStatusService') private readonly statusService: IStatusService,
        @inject('IStateService') private readonly stateService: IStateService,
    ) {
    }

    //#endregion

    //#region CREATE
    @LogError()
    async create(data: CreatePhoneCodeDTO, transaction: Transaction): Promise<PhoneCodeEntity> {
        const status: StatusEntity = await this.statusService.getStatusForNewEntities();
        const statusId: number = status.id!;

        const entity: PhoneCodeEntity = PhoneCodeEntity.create({
            dddCode: data.dddCode,
            ddiCode: data.ddiCode,
            stateId: data.stateId,
            statusId: statusId
        });

        await this.validateForeignKeys(entity);
        const isUnique = await this.isUniqueEntity(entity.ddiCode, entity.dddCode, entity.stateId);

        if (!isUnique) {
            throw new ConflictError(EntitiesMessage.error.conflict.duplicateValueGeneric);
        }

        return (await this.repo.create(entity, transaction)).unwrapOrThrow();
    }
    //#endregion

    //#region READ
    @LogError()
    async getById(id: number): Promise<PhoneCodeEntity> {
        const found: ResultType<PhoneCodeDTO> = await this.repo.findById(id);
        const entity: PhoneCodeEntity | null = found.unwrapOrNull();

        if (!entity) throw new NotFoundError(EntitiesMessage.error.retrieval.notFound(this.PHONE_CODE));

        return entity;
    }

    @LogError()
    async findMany(filter?: PhoneCodeFilterDTO, page?: number, limit?: number): Promise<FindAllType<PhoneCodeEntity>> {
        const pageValue: number = page ?? 1;
        const limitValue: number = limit ?? 20;
        const offset: number = (pageValue - 1) * limitValue;

        const found: ResultType<FindAllType<PhoneCodeEntity>> = await this.repo.findMany(limitValue, offset, filter);

        if (!found.isSuccess()) throw new NotFoundError(EntitiesMessage.error.retrieval.notFound(this.PHONE_CODE));

        return found.unwrap();
    }
    //#endregion

    //#region UPDATE
    @LogError()
    async update(newData: UpdatePhoneCodeDTO, transaction: Transaction): Promise<UpdateResultType<PhoneCodeEntity>> {
        const entity: PhoneCodeEntity = await this.getById(newData.id!);

        let updatedEntity: PhoneCodeEntity = entity.update({
            dddCode: newData.dddCode ?? entity.dddCode,
            ddiCode: newData.ddiCode ?? entity.ddiCode,
            stateId: newData.stateId ?? entity.stateId,
            statusId: newData.statusId ?? entity.statusId,
        })

        await this.validateForeignKeys(updatedEntity)

        if (updatedEntity.isEqual(entity)) {
            return { entity: entity, updated: false };
        }

        if (newData.dddCode || newData.ddiCode || newData.stateId) {
            const isUnique: boolean = await this.isUniqueEntity(updatedEntity.ddiCode, updatedEntity.dddCode, updatedEntity.stateId);

            if (!isUnique) {
                return {entity: updatedEntity, updated: false};
            }

            updatedEntity = updatedEntity.update({statusId: (await this.statusService.getStatusForNewEntities()).id!});
        }

        const updated: ResultType<boolean> = await this.repo.update(updatedEntity, transaction);

        if (!updated.isSuccess()) throw new Error(EntitiesMessage.error.failure.update(this.PHONE_CODE));

        return {entity: updatedEntity, updated: updated.unwrap()};
    }
    //#endregion

    //#region DELETE

    @LogError()
    async delete(id: number, transaction: Transaction): Promise<DeleteStatusEnum> {
        const entity: PhoneCodeEntity = await this.getById(id);
        const inactiveStatus: StatusEntity = await this.statusService.getStatusForInactiveEntities();

        if (entity.statusId === inactiveStatus.id) {
            return DeleteStatusEnum.ALREADY_INACTIVE;
        }

        const deletedEntity: PhoneCodeEntity = entity.update({statusId: inactiveStatus.id});
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
            const entity: PhoneCodeEntity | null = await this.getById(id);

            if (!entity) {
                notFound.push(id);
                continue;
            }

            if (entity.statusId === inactiveStatus.id) {
                alreadyInactive.push(id);
                continue;
            }

            const deletedEntity: PhoneCodeEntity = entity.update({statusId: inactiveStatus.id});
            await this.repo.update(deletedEntity, transaction);
            deleted.push(id);
        }

        return {deleted, alreadyInactive, notFound};
    }

    //#endregion

    @LogError()
    private async isUniqueEntity(ddiCode: number, dddCode: number, stateId: number): Promise<boolean> {
        const filter: PhoneCodeFilterDTO = {
            ddiCode,
            dddCode,
            stateId
        };

        const result: FindAllType<PhoneCodeEntity> = await this.findMany(filter);

        return result.total <= 0;
    }

    @LogError()
    private async validateForeignKeys(data: Partial<PhoneCodeDTO>): Promise<void> {
        const validateExistence = async <T>(
            field: keyof PhoneCodeDTO,
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