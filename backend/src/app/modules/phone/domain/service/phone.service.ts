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

@injectable()
export class PhoneService extends ServiceBase<PhoneDtoBaseType, PhoneEntity> implements IPhoneService {
    //#region PROPERTIES
    private readonly uniquenessValidator: EntityUniquenessValidator<PhoneBaseRepositoryType>;
    //#endregion

    //#region CONSTRUCTOR
    constructor(
        @inject("IPhoneRepository") protected readonly repo: IPhoneRepository,
        @inject("EntityUniquenessValidatorFactory") private readonly validatorFactory: EntityUniquenessValidatorFactory,
        @inject("PhoneRepository") private readonly phoneRepository: IRepositoryBase<PhoneBaseRepositoryType>,
        @inject('IStatusService') protected readonly statusService: IStatusService,
        @inject("IPhoneCodeService") private readonly phoneCodeService: IPhoneCodeService,
        @inject("IPhoneTypeService") private readonly phoneTypeService: IPhoneTypeService,
    ) {
        super(repo, PhoneEntity, statusService);
        this.uniquenessValidator = this.validatorFactory(this.phoneRepository);
    }

    //#endregion

    //#region HELPERS
    @LogError()
    protected async createEntity(data: PhoneDtoBaseType["CreateDTO"], statusId: number): Promise<PhoneEntity> {
        return PhoneEntity.create({
            number: data.number,
            phoneCodeId: data.phoneCodeId,
            phoneTypeId: data.phoneTypeId,
            statusId
        });
    }

    @LogError()
    protected async uniquenessValidatorEntity(entity: PhoneEntity): Promise<void> {
        const isUnique: boolean = await this.uniquenessValidator.validate('number', entity.number);
        if (!isUnique) {
            throw new ConflictError(EntitiesMessage.error.conflict.duplicateValue("PHONE", "number"));
        }
    }

    @LogError()
    protected filterTransform(input: PhoneDtoBaseType['FilterDTO']): PhoneDtoBaseType['FilterDTO'] {
        return input;
    }

    @LogError()
    protected async validateForeignKeys(data: Partial<PhoneDtoBaseType["DTO"]>): Promise<void> {
        await Promise.all([
            this.validateExistence("phoneCodeId", data.phoneCodeId, this.phoneCodeService),
            this.validateExistence("phoneTypeId", data.phoneTypeId, this.phoneTypeService),
            this.validateStatusExistence(data.statusId),
        ]);
    }
    //#endregion
}