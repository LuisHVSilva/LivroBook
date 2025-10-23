import {inject, injectable} from "tsyringe";
import {IPhoneTypeService} from "@phone/domain/service/interfaces/IPhoneType.service";
import {EntityUniquenessValidator} from "@coreShared/validators/entityUniqueness.validator";
import {EntityUniquenessValidatorFactory} from "@coreShared/factories/entityUniquenessValidator.factory";
import {IRepositoryBase} from "@coreShared/base/interfaces/IRepositoryBase";
import {IStatusService} from "@status/domain/services/interfaces/IStatus.service";
import {PhoneTypeEntity} from "@phone/domain/entities/phoneType.entity";
import {IPhoneTypeRepository} from "@phone/infrastructure/repositories/interface/IPhoneType.repository";
import {LogError} from "@coreShared/decorators/LogError";
import {ConflictError} from "@coreShared/errors/classes.error";
import {EntitiesMessage} from "@coreShared/messages/entities.message";
import {ServiceBase} from "@coreShared/base/service.base";
import {PhoneTypeTransformer} from "@phone/domain/transformers/phoneType.transform";
import {PhoneTypeBaseRepositoryType, PhoneTypeDtoBaseType} from "@phone/adapters/dtos/phoneType.dto";
import {StringUtil} from "@coreShared/utils/string.util";
import {StatusTransformer} from "@status/domain/transformers/Status.transformer";

@injectable()
export class PhoneTypeService extends ServiceBase<PhoneTypeDtoBaseType, PhoneTypeEntity> implements IPhoneTypeService {
    //#region PROPERTIES
    private readonly uniquenessValidator: EntityUniquenessValidator<PhoneTypeBaseRepositoryType>;
    //#endregion

    //#region CONSTRUCTOR
    constructor(
        @inject("IPhoneTypeRepository")
        protected readonly repo: IPhoneTypeRepository,
        @inject("EntityUniquenessValidatorFactory")
        private readonly validatorFactory: EntityUniquenessValidatorFactory,
        @inject("PhoneTypeRepository")
        private readonly phoneTypeRepository: IRepositoryBase<PhoneTypeBaseRepositoryType>,
        @inject('IStatusService')
        protected readonly statusService: IStatusService,
    ) {
        super(repo, PhoneTypeEntity, statusService);
        this.uniquenessValidator = this.validatorFactory(this.phoneTypeRepository);
    }

    //#endregion


    protected async createEntity(data: PhoneTypeDtoBaseType["CreateDTO"], status: string): Promise<PhoneTypeEntity> {
        return PhoneTypeEntity.create({
            description: data.description,
            status
        });
    }

    @LogError()
    protected async uniquenessValidatorEntity(entity: PhoneTypeEntity, previousEntity?: PhoneTypeEntity): Promise<void> {
        const isUnique: boolean = await this.uniquenessValidator.validate('description', entity.description, previousEntity);

        if (!isUnique) {
            throw new ConflictError(EntitiesMessage.error.conflict.duplicateValue(PhoneTypeEntity.name, "description"));
        }
    }

    @LogError()
    protected filterTransform(input: PhoneTypeDtoBaseType['FilterDTO']): PhoneTypeDtoBaseType['FilterDTO'] {
        return StringUtil.applyFilterTransform(input, {
            description: PhoneTypeTransformer.normalizeDescription,
            status: StatusTransformer.normalizeDescription,
        });
    }

    @LogError()
    protected async validateForeignKeys(data: Partial<PhoneTypeDtoBaseType["DTO"]>): Promise<void> {
        await this.validateStatusExistence(data.status)
    }

}