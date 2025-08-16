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
import {CreateResultType, UpdateResultType} from "@coreShared/types/crudResult.type";
import {StatusEntity} from "@status/domain/entities/status.entity";
import {ConflictError, NotFoundError} from "@coreShared/errors/domain.error";
import {EntitiesMessage} from "@coreShared/messages/entities.message";
import {FindAllType} from "@coreShared/types/findAll.type";
import {ResultType} from "@coreShared/types/result.type";
import {IStateService} from "@location/domain/services/interfaces/IState.service";

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

    @LogError()
    async create(data: CreatePhoneCodeDTO, transaction: Transaction): Promise<CreateResultType<PhoneCodeEntity>> {
        const status: StatusEntity = await this.statusService.getStatusForNewEntities();
        const statusId: number = status.id!;

        const entity: PhoneCodeEntity = PhoneCodeEntity.create({
            dddCode: data.dddCode,
            ddiCode: data.ddiCode,
            stateId: data.stateId,
            statusId: statusId
        });

        const isUnique = await this.isUniqueEntity(entity.ddiCode, entity.dddCode, entity.stateId);

        if (!isUnique) {
            throw new ConflictError(EntitiesMessage.error.conflict.duplicateValueGeneric);
        }

        const created: PhoneCodeEntity = (await this.repo.create(entity, transaction)).unwrapOrThrow();

        return {entity: created, created: true};
    }

    @LogError()
    async getAll(filter?: PhoneCodeFilterDTO, page?: number, limit?: number): Promise<FindAllType<PhoneCodeEntity>> {
        const pageValue: number = page ?? 1;
        const limitValue: number = limit ?? 20;
        const offset: number = (pageValue - 1) * limitValue;

        const found: ResultType<FindAllType<PhoneCodeEntity>> = await this.repo.findMany(limitValue, offset, filter);

        if (!found.isSuccess()) throw new NotFoundError(EntitiesMessage.error.retrieval.notFound(this.PHONE_CODE));

        return found.unwrap();
    }

    @LogError()
    async getById(id: number): Promise<PhoneCodeEntity | null> {
        return (await this.repo.findById(id)).unwrapOrNull() ?? null;
    }

    @LogError()
    async update(newData: UpdatePhoneCodeDTO, transaction: Transaction): Promise<UpdateResultType<PhoneCodeEntity>> {
        const existing: PhoneCodeEntity | null = await this.getById(newData.id!);

        if (!existing) throw new NotFoundError(EntitiesMessage.error.retrieval.notFound(this.PHONE_CODE));

        let updatedEntity: PhoneCodeEntity = existing.update({
            dddCode: newData.newDddCode ?? existing.dddCode,
            ddiCode: newData.newDdiCode ?? existing.ddiCode,
            stateId: newData.newStateId ?? existing.stateId,
            statusId: newData.newStatusId ?? existing.statusId,
        })

        await this.validateForeignKeys(updatedEntity)

        if (newData.newDdiCode || newData.newDddCode || newData.newStateId) {
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

    @LogError()
    async delete(id: number, transaction: Transaction): Promise<void> {
        const entity: PhoneCodeEntity | null = await this.getById(id);
        if (!entity) throw new NotFoundError(EntitiesMessage.error.retrieval.notFoundById(id.toString()));

        const inactiveStatus: StatusEntity = await this.statusService.getStatusForInactiveEntities();

        if (entity.statusId === inactiveStatus.id) return;

        const deletedEntity: PhoneCodeEntity = entity.update({statusId: inactiveStatus.id});
        await this.repo.update(deletedEntity, transaction);
    }

    @LogError()
    private async isUniqueEntity(ddiCode: number, dddCode: number, stateId: number): Promise<boolean> {
        const filter: PhoneCodeFilterDTO = {
            ddiCode,
            dddCode,
            stateId
        };

        const result: FindAllType<PhoneCodeEntity> = await this.getAll(filter);

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