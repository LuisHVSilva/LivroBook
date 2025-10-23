import {inject, injectable} from "tsyringe";
import {IPhoneCodeService} from "@phone/domain/service/interfaces/IPhoneCode.service";
import {PhoneCodeEntity} from "@phone/domain/entities/phoneCode.entity";
import {
    PhoneCodeDtoBaseType,
    PhoneCodeFilterDTO
} from "@phone/adapters/dtos/phoneCode.dto";
import {IPhoneCodeRepository} from "@phone/infrastructure/repositories/interface/IPhoneCode.repository";
import {IStatusService} from "@status/domain/services/interfaces/IStatus.service";
import {ConflictError} from "@coreShared/errors/classes.error";
import {EntitiesMessage} from "@coreShared/messages/entities.message";
import {FindAllType} from "@coreShared/types/findAll.type";
import {IStateService} from "@location/domain/services/interfaces/IState.service";
import {ServiceBase} from "@coreShared/base/service.base";
import {StringUtil} from "@coreShared/utils/string.util";
import {StateTransformer} from "@location/domain/transformers/state.transform";
import {StatusTransformer} from "@status/domain/transformers/Status.transformer";

@injectable()
export class PhoneCodeService extends ServiceBase<PhoneCodeDtoBaseType, PhoneCodeEntity> implements IPhoneCodeService {
    //#region CONSTRUCTOR
    constructor(
        @inject("IPhoneCodeRepository")
        protected readonly repo: IPhoneCodeRepository,
        @inject('IStatusService')
        protected readonly statusService: IStatusService,
        @inject('IStateService')
        private readonly stateService: IStateService,
    ) {
        super(repo, PhoneCodeEntity, statusService);
    }

    //#endregion


    protected async createEntity(data: PhoneCodeDtoBaseType["CreateDTO"], status: string): Promise<PhoneCodeEntity> {
        return PhoneCodeEntity.create({
            ddiCode: data.ddiCode,
            dddCode: data.dddCode,
            state: data.state,
            status
        });
    }


    protected async uniquenessValidatorEntity(entity: PhoneCodeEntity): Promise<void> {
        const filter: PhoneCodeFilterDTO = {
            ddiCode: StringUtil.parseCsvFilter(entity.ddiCode?.toString(), Number),
            dddCode: StringUtil.parseCsvFilter(entity.dddCode?.toString(), Number),
            state: StringUtil.parseCsvFilter(entity.state?.toString(), String)
        }

        const result: FindAllType<PhoneCodeEntity> = await this.findMany(filter);
        const isUnique: boolean = result.total <= 0;

        if (!isUnique) {
            throw new ConflictError(EntitiesMessage.error.conflict.duplicateValue("PHONE", "number"));
        }
    }


    protected filterTransform(input: PhoneCodeDtoBaseType['FilterDTO']): PhoneCodeDtoBaseType['FilterDTO'] {
        return StringUtil.applyFilterTransform(input, {
            state: StateTransformer.normalizeDescription,
            status: StatusTransformer.normalizeDescription,
        });
    }


    protected async validateForeignKeys(data: Partial<PhoneCodeDtoBaseType["DTO"]>): Promise<void> {
        await Promise.all([
            this.validateExistence("state", data.state, 'description', this.stateService),
            this.validateStatusExistence(data.status),
        ]);
    }

}