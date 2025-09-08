import {inject, injectable} from "tsyringe";
import {IPhoneCodeService, PhoneCodeDtoBaseType} from "@phone/domain/service/interfaces/IPhoneCode.service";
import {PhoneCodeEntity} from "@phone/domain/entities/phoneCode.entity";
import {
    PhoneCodeFilterDTO
} from "@phone/adapters/dtos/phoneCode.dto";
import {IPhoneCodeRepository} from "@phone/infrastructure/repositories/interface/IPhoneCode.repository";
import {IStatusService} from "@status/domain/services/interfaces/IStatus.service";
import {LogError} from "@coreShared/decorators/LogError";
import {ConflictError, NotFoundError} from "@coreShared/errors/domain.error";
import {EntitiesMessage} from "@coreShared/messages/entities.message";
import {FindAllType} from "@coreShared/types/findAll.type";
import {IStateService} from "@location/domain/services/interfaces/IState.service";
import {ServiceBase} from "@coreShared/base/service.base";

@injectable()
export class PhoneCodeService extends ServiceBase<PhoneCodeDtoBaseType, PhoneCodeEntity> implements IPhoneCodeService {
    //#region CONSTRUCTOR
    constructor(
        @inject("IPhoneCodeRepository") protected readonly repo: IPhoneCodeRepository,
        @inject('IStatusService') protected readonly statusService: IStatusService,
        @inject('IStateService') private readonly stateService: IStateService,
    ) {
        super(repo, PhoneCodeEntity, statusService);
    }

    //#endregion

    @LogError()
    protected async createEntity(data: PhoneCodeDtoBaseType["CreateDTO"], statusId: number): Promise<PhoneCodeEntity> {
        return PhoneCodeEntity.create({
            ddiCode: data.ddiCode,
            dddCode: data.dddCode,
            stateId: data.stateId,
            statusId
        });
    }

    @LogError()
    protected async uniquenessValidatorEntity(entity: PhoneCodeEntity): Promise<void> {
        const filter: PhoneCodeFilterDTO = {
            ddiCode: entity.ddiCode ?? undefined,
            dddCode: entity.dddCode ?? undefined,
            stateId: entity.stateId ?? undefined,
        }

        const result: FindAllType<PhoneCodeEntity> = await this.findMany(filter);
        const isUnique: boolean = result.total <= 0;

        if (!isUnique) {
            throw new ConflictError(EntitiesMessage.error.conflict.duplicateValue("PHONE", "number"));
        }
    }

    @LogError()
    protected filterTransform(input: PhoneCodeDtoBaseType['FilterDTO']): PhoneCodeDtoBaseType['FilterDTO'] {
        return input;
    }

    @LogError()
    protected async validateForeignKeys(data: Partial<PhoneCodeDtoBaseType["DTO"]>): Promise<void> {
        const validateExistence = async <T>(
            field: keyof PhoneCodeDtoBaseType["DTO"],
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

    @LogError()
    protected async handleBusinessRules(oldEntity: PhoneCodeEntity, newEntity: PhoneCodeEntity): Promise<void> {
        await this.uniquenessValidatorEntity(newEntity);
    }
}