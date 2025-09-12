import {inject, injectable} from "tsyringe";
import {IPhoneCodeService} from "@phone/domain/service/interfaces/IPhoneCode.service";
import {PhoneCodeEntity} from "@phone/domain/entities/phoneCode.entity";
import {
    PhoneCodeDtoBaseType,
    PhoneCodeFilterDTO
} from "@phone/adapters/dtos/phoneCode.dto";
import {IPhoneCodeRepository} from "@phone/infrastructure/repositories/interface/IPhoneCode.repository";
import {IStatusService} from "@status/domain/services/interfaces/IStatus.service";
import {LogError} from "@coreShared/decorators/LogError";
import {ConflictError} from "@coreShared/errors/domain.error";
import {EntitiesMessage} from "@coreShared/messages/entities.message";
import {FindAllType} from "@coreShared/types/findAll.type";
import {IStateService} from "@location/domain/services/interfaces/IState.service";
import {ServiceBase} from "@coreShared/base/service.base";
import {StringUtil} from "@coreShared/utils/string.util";

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
            ddiCode: StringUtil.parseCsvFilter(entity.ddiCode?.toString(), Number),
            dddCode: StringUtil.parseCsvFilter(entity.dddCode?.toString(), Number),
            stateId: StringUtil.parseCsvFilter(entity.stateId?.toString(), Number)
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
        await Promise.all([
            this.validateExistence("stateId", data.stateId, this.stateService),
            this.validateStatusExistence(data.statusId),
        ]);
    }

}