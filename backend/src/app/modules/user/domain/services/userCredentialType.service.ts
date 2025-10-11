import {inject, injectable} from "tsyringe";
import {ServiceBase} from "@coreShared/base/service.base";
import {EntityUniquenessValidator} from "@coreShared/validators/entityUniqueness.validator";
import {EntityUniquenessValidatorFactory} from "@coreShared/factories/entityUniquenessValidator.factory";
import {IRepositoryBase} from "@coreShared/base/interfaces/IRepositoryBase";
import {IStatusService} from "@status/domain/services/interfaces/IStatus.service";
import {LogError} from "@coreShared/decorators/LogError";
import {ConflictError, NotFoundError} from "@coreShared/errors/domain.error";
import {EntitiesMessage} from "@coreShared/messages/entities.message";
import {
    UserCredentialTypeBaseRepositoryType,
    UserCredentialTypeDtoBaseType
} from "@user/adapters/dtos/userCredentialType.dto";
import {UserCredentialTypeEntity} from "@user/domain/entities/userCredentialType.entity";
import {IUserCredentialTypeService} from "@user/domain/services/interface/IUserCredentialType.service";
import {IUserCredentialTypeRepository} from "@user/infrastructure/repositories/interface/IUserCredentialType.repository";
import {UserCredentialTypeTransform} from "@user/domain/transformers/userCredentialType.transformer";
import {ResultType} from "@coreShared/types/result.type";
import {StatusTransformer} from "@status/domain/transformers/Status.transformer";
import {StringUtil} from "@coreShared/utils/string.util";

@injectable()
export class UserCredentialTypeService extends ServiceBase<UserCredentialTypeDtoBaseType, UserCredentialTypeEntity> implements IUserCredentialTypeService {
    //#region PROPERTIES
    private readonly uniquenessValidator: EntityUniquenessValidator<UserCredentialTypeBaseRepositoryType>;
    //#endregion

    //#region CONSTRUCTOR
    constructor(
        @inject("IUserCredentialTypeRepository") protected readonly repo: IUserCredentialTypeRepository,
        @inject("EntityUniquenessValidatorFactory") private readonly validatorFactory: EntityUniquenessValidatorFactory,
        @inject("UserCredentialTypeRepository") private readonly userTypeRepo: IRepositoryBase<UserCredentialTypeBaseRepositoryType>,
        @inject('IStatusService') protected readonly statusService: IStatusService,
    ) {
        super(repo, UserCredentialTypeEntity, statusService);
        this.uniquenessValidator = this.validatorFactory(this.userTypeRepo);
    }

    //#endregion

    async getExactByDescription(description: string): Promise<UserCredentialTypeEntity> {
        const founded: ResultType<UserCredentialTypeEntity> = await this.repo.findOneByFilter({description});
        const entity: UserCredentialTypeEntity | null = founded.unwrapOrNull();

        if (!entity) {
            throw new NotFoundError(EntitiesMessage.error.retrieval.notFound(this.entityClass.name))
        }

        return entity;
    }

    //#region HELPERS
    @LogError()
    protected async createEntity(data: UserCredentialTypeDtoBaseType["CreateDTO"], status: string): Promise<UserCredentialTypeEntity> {
        return UserCredentialTypeEntity.create({
            description: data.description,
            status
        });
    }

    @LogError()
    protected async uniquenessValidatorEntity(entity: UserCredentialTypeEntity, previousEntity?: UserCredentialTypeEntity): Promise<void> {
        const isUnique: boolean = await this.uniquenessValidator.validate('description', entity.description, previousEntity);

        if (!isUnique) throw new ConflictError(EntitiesMessage.error.conflict.duplicateValue(UserCredentialTypeEntity.name, 'description'));
    }

    @LogError()
    protected filterTransform(input: UserCredentialTypeDtoBaseType['FilterDTO']): UserCredentialTypeDtoBaseType['FilterDTO'] {
        return StringUtil.applyFilterTransform(input, {
            description: UserCredentialTypeTransform.normalizeDescription,
            status: StatusTransformer.normalizeDescription,
        });
    }

    @LogError()
    protected async validateForeignKeys(data: Partial<UserCredentialTypeDtoBaseType["DTO"]>): Promise<void> {
        await this.validateStatusExistence(data.status);
    }
    //#endregion
}