import {inject, injectable} from "tsyringe";
import {IStatusService} from "@status/domain/services/interfaces/IStatus.service";
import {LogError} from "@coreShared/decorators/LogError";
import {ConflictError} from "@coreShared/errors/domain.error";
import {EntitiesMessage} from "@coreShared/messages/entities.message";
import {EntityUniquenessValidator} from "@coreShared/validators/entityUniqueness.validator";
import {EntityUniquenessValidatorFactory} from "@coreShared/factories/entityUniquenessValidator.factory";
import {IRepositoryBase} from "@coreShared/base/interfaces/IRepositoryBase";
import {PhoneEntity} from "@phone/domain/entities/phone.entity";
import {IPhoneService} from "@phone/domain/service/interfaces/IPhone.service";
import {IPhoneRepository} from "@phone/infrastructure/repositories/interface/IPhone.repository";
import {IPhoneCodeService} from "@phone/domain/service/interfaces/IPhoneCode.service";
import {IPhoneTypeService} from "@phone/domain/service/interfaces/IPhoneType.service";
import {ServiceBase} from "@coreShared/base/service.base";
import {PhoneBaseRepositoryType, PhoneDtoBaseType} from "@phone/adapters/dtos/phone.dto";
import {StringUtil} from "@coreShared/utils/string.util";
import {StatusTransformer} from "@status/domain/transformers/Status.transformer";
import {PhoneTypeTransformer} from "@phone/domain/transformers/phoneType.transform";

@injectable()
export class PhoneService extends ServiceBase<PhoneDtoBaseType, PhoneEntity> implements IPhoneService {
    //#region PROPERTIES
    private readonly uniquenessValidator: EntityUniquenessValidator<PhoneBaseRepositoryType>;
    //#endregion

    //#region CONSTRUCTOR
    constructor(
        @inject("IPhoneRepository")
        protected readonly repo: IPhoneRepository,
        @inject("EntityUniquenessValidatorFactory")
        private readonly validatorFactory: EntityUniquenessValidatorFactory,
        @inject("PhoneRepository")
        private readonly phoneRepository: IRepositoryBase<PhoneBaseRepositoryType>,
        @inject('IStatusService')
        protected readonly statusService: IStatusService,
        @inject("IPhoneCodeService")
        private readonly phoneCodeService: IPhoneCodeService,
        @inject("IPhoneTypeService")
        private readonly phoneTypeService: IPhoneTypeService,
    ) {
        super(repo, PhoneEntity, statusService);
        this.uniquenessValidator = this.validatorFactory(this.phoneRepository);
    }

    //#endregion

    //#region HELPERS
    @LogError()
    protected async createEntity(data: PhoneDtoBaseType["CreateDTO"], status: string): Promise<PhoneEntity> {
        return PhoneEntity.create({
            number: data.number,
            phoneCode: data.phoneCode,
            phoneType: data.phoneType,
            status
        });
    }

    @LogError()
    protected async uniquenessValidatorEntity(entity: PhoneEntity, previousEntity: PhoneEntity): Promise<void> {
        const isUnique: boolean = await this.uniquenessValidator.validate('number', entity.number, previousEntity);
        if (!isUnique) {
            throw new ConflictError(EntitiesMessage.error.conflict.duplicateValue("PHONE", "number"));
        }
    }

    @LogError()
    protected filterTransform(input: PhoneDtoBaseType['FilterDTO']): PhoneDtoBaseType['FilterDTO'] {
        return StringUtil.applyFilterTransform(input, {
            phoneType: PhoneTypeTransformer.normalizeDescription,
            status: StatusTransformer.normalizeDescription,
        });
    }

    @LogError()
    protected async validateForeignKeys(data: Partial<PhoneDtoBaseType["DTO"]>): Promise<void> {
        await this.validateExistence("phoneCode", undefined, {
            ddiCode: data.phoneCode?.ddiCode,
            dddCode: data.phoneCode?.dddCode
        }, this.phoneCodeService, true);
        // await Promise.all([
        //     this.validateExistence("phoneType", data.phoneType, "description", this.phoneTypeService),
        //     this.validateStatusExistence(data.status),
        // ]);
    }

    //#endregion
}