import {inject, injectable} from "tsyringe";
import {IPhoneTypeService, PhoneTypeDtoBaseType} from "@phone/domain/service/interfaces/IPhoneType.service";
import {EntityUniquenessValidator} from "@coreShared/validators/entityUniqueness.validator";
import {EntityUniquenessValidatorFactory} from "@coreShared/factories/entityUniquenessValidator.factory";
import {IRepositoryBase} from "@coreShared/base/interfaces/IRepositoryBase";
import {IStatusService} from "@status/domain/services/interfaces/IStatus.service";
import {PhoneTypeEntity} from "@phone/domain/entities/phoneType.entity";
import {
    IPhoneTypeRepository,
    PhoneTypeBaseRepositoryType
} from "@phone/infrastructure/repositories/interface/IPhoneType.repository";
import {LogError} from "@coreShared/decorators/LogError";
import {ConflictError, NotFoundError} from "@coreShared/errors/domain.error";
import {EntitiesMessage} from "@coreShared/messages/entities.message";
import {ServiceBase} from "@coreShared/base/service.base";
import {CityDtoBaseType} from "@location/domain/services/interfaces/ICity.service";
import {PhoneTypeTransformer} from "@phone/domain/transformers/phoneType.transform";

@injectable()
export class PhoneTypeService extends ServiceBase<PhoneTypeDtoBaseType, PhoneTypeEntity> implements IPhoneTypeService {
    //#region PROPERTIES
    private readonly uniquenessValidator: EntityUniquenessValidator<PhoneTypeBaseRepositoryType>;
    private readonly PHONE_TYPE: string = PhoneTypeEntity.ENTITY_NAME;
    //#endregion

    //#region CONSTRUCTOR
    constructor(
        @inject("IPhoneTypeRepository") protected readonly repo: IPhoneTypeRepository,
        @inject("EntityUniquenessValidatorFactory") private readonly validatorFactory: EntityUniquenessValidatorFactory,
        @inject("PhoneTypeRepository") private readonly phoneTypeRepository: IRepositoryBase<PhoneTypeBaseRepositoryType>,
        @inject('IStatusService') protected readonly statusService: IStatusService,
    ) {
        super(repo, PhoneTypeEntity, statusService);
        this.uniquenessValidator = this.validatorFactory(this.phoneTypeRepository);
    }

    //#endregion

    @LogError()
    protected async createEntity(data: PhoneTypeDtoBaseType["CreateDTO"], statusId: number): Promise<PhoneTypeEntity> {
        return PhoneTypeEntity.create({
            description: data.description,
            statusId
        });
    }

    @LogError()
    protected async uniquenessValidatorEntity(entity: PhoneTypeEntity): Promise<void> {
        const isUnique: boolean = await this.uniquenessValidator.validate('description', entity.description);

        if (!isUnique) {
            throw new ConflictError(EntitiesMessage.error.conflict.duplicateValue(this.PHONE_TYPE, "description"));
        }
    }

    @LogError()
    protected filterTransform(input: PhoneTypeDtoBaseType['FilterDTO']): PhoneTypeDtoBaseType['FilterDTO'] {
        const transformedFilter: CityDtoBaseType['FilterDTO'] = {...input};

        if (input.description !== undefined) {
            if (Array.isArray(input.description)) {
                transformedFilter.description = input.description.map(desc =>
                    PhoneTypeTransformer.normalizeDescription(desc)
                );
            } else {
                transformedFilter.description = PhoneTypeTransformer.normalizeDescription(input.description);
            }
        }

        return transformedFilter;
    }

    @LogError()
    protected async validateForeignKeys(data: Partial<PhoneTypeDtoBaseType["DTO"]>): Promise<void> {
        const validateExistence = async <T>(
            field: keyof PhoneTypeDtoBaseType["DTO"],
            id: number | undefined,
            service: { getById: (id: number) => Promise<T | null> }
        ): Promise<void> => {
            if (id == null) return;
            if (!(await service.getById(id))) {
                throw new NotFoundError(EntitiesMessage.error.retrieval.notFoundForeignKey(field, id));
            }
        };

        await Promise.all([
            validateExistence("statusId", data.statusId, this.statusService)
        ]);
    }

    @LogError()
    protected async handleBusinessRules(oldEntity: PhoneTypeEntity, newEntity: PhoneTypeEntity): Promise<void> {
        if (newEntity.description !== oldEntity.description) {
            await this.uniquenessValidatorEntity(newEntity);
        }
    }
}