import {inject, injectable} from "tsyringe";
import {ServiceBase} from "@coreShared/base/service.base";
import {IUserTypeService} from "@user/domain/services/interface/IUserType.service";
import {UserTypeEntity} from "@user/domain/entities/userType.entity";
import {EntityUniquenessValidator} from "@coreShared/validators/entityUniqueness.validator";
import {IUserTypeRepository} from "@user/infrastructure/repositories/interface/IUserType.repository";
import {EntityUniquenessValidatorFactory} from "@coreShared/factories/entityUniquenessValidator.factory";
import {IRepositoryBase} from "@coreShared/base/interfaces/IRepositoryBase";
import {IStatusService} from "@status/domain/services/interfaces/IStatus.service";
import {LogError} from "@coreShared/decorators/LogError";
import {ConflictError, NotFoundError} from "@coreShared/errors/domain.error";
import {EntitiesMessage} from "@coreShared/messages/entities.message";
import {UserTypeTransform} from "@user/domain/transformers/userType.transformer";
import {UserTypeBaseRepositoryType, UserTypeDtoBaseType} from "@user/adapters/dtos/userType.dto";
import {ResultType} from "@coreShared/types/result.type";
import {UserTypeDescriptionEnum} from "@user/domain/enums/userType.enum";
import {StatusTransformer} from "@status/domain/transformers/Status.transformer";
import {StringUtil} from "@coreShared/utils/string.util";

@injectable()
export class UserTypeService extends ServiceBase<UserTypeDtoBaseType, UserTypeEntity> implements IUserTypeService {
    //#region PROPERTIES
    private readonly uniquenessValidator: EntityUniquenessValidator<UserTypeBaseRepositoryType>;
    //#endregion

    //#region CONSTRUCTOR
    constructor(
        @inject("IUserTypeRepository") protected readonly repo: IUserTypeRepository,
        @inject("EntityUniquenessValidatorFactory") private readonly validatorFactory: EntityUniquenessValidatorFactory,
        @inject("UserTypeRepository") private readonly userTypeRepo: IRepositoryBase<UserTypeBaseRepositoryType>,
        @inject('IStatusService') protected readonly statusService: IStatusService,
    ) {
        super(repo, UserTypeEntity, statusService);
        this.uniquenessValidator = this.validatorFactory(this.userTypeRepo);
    }

    //#endregion
    async getStandardUserType(): Promise<UserTypeEntity> {
        return this.getExactByDescription(UserTypeDescriptionEnum.STANDARD);
    }

    async getAdminUserType(): Promise<UserTypeEntity> {
        return this.getExactByDescription(UserTypeDescriptionEnum.ADMIN);
    }


    //#region HELPERS
    @LogError()
    async getExactByDescription(description: string): Promise<UserTypeEntity> {
        const descriptionFormatted: string = UserTypeTransform.normalizeDescription(description);
        const entity: ResultType<UserTypeEntity> = await this.repo.findOneByFilter({
            description: descriptionFormatted
        });

        if (!entity.isSuccess()) {
            throw new NotFoundError(EntitiesMessage.error.retrieval.notFound(UserTypeEntity.name));
        }

        return entity.unwrapOrThrow();
    }

    @LogError()
    protected async createEntity(data: UserTypeDtoBaseType["CreateDTO"], status: string): Promise<UserTypeEntity> {
        return UserTypeEntity.create({
            description: data.description,
            status
        });
    }

    @LogError()
    protected async uniquenessValidatorEntity(entity: UserTypeEntity, previousEntity?: UserTypeEntity): Promise<void> {
        const isUnique: boolean = await this.uniquenessValidator.validate('description', entity.description, previousEntity);

        if (!isUnique) throw new ConflictError(EntitiesMessage.error.conflict.duplicateValue(UserTypeEntity.name, 'description'));
    }

    @LogError()
    protected filterTransform(input: UserTypeDtoBaseType['FilterDTO']): UserTypeDtoBaseType['FilterDTO'] {
        return StringUtil.applyFilterTransform(input, {
            description: UserTypeTransform.normalizeDescription,
            status: StatusTransformer.normalizeDescription,
        });
    }

    @LogError()
    protected async validateForeignKeys(data: Partial<UserTypeDtoBaseType["DTO"]>): Promise<void> {
        await this.validateStatusExistence(data.status);
    }

    //#endregion
}