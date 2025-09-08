import {inject, injectable} from "tsyringe";
import {ServiceBase} from "@coreShared/base/service.base";
import {EntityUniquenessValidator} from "@coreShared/validators/entityUniqueness.validator";
import {EntityUniquenessValidatorFactory} from "@coreShared/factories/entityUniquenessValidator.factory";
import {IRepositoryBase} from "@coreShared/base/interfaces/IRepositoryBase";
import {IStatusService} from "@status/domain/services/interfaces/IStatus.service";
import {LogError} from "@coreShared/decorators/LogError";
import {ConflictError, NotFoundError} from "@coreShared/errors/domain.error";
import {EntitiesMessage} from "@coreShared/messages/entities.message";
import {UserCredentialTypeDtoBaseType} from "@user/adapters/dtos/userCredentialType.dto";
import {UserCredentialTypeEntity} from "@user/domain/entities/userCredentialType.entity";
import {IUserCredentialTypeService} from "@user/domain/services/interface/IUserCredentialType.service";
import {
    IUserCredentialTypeRepository, UserCredentialTypeBaseRepositoryType
} from "@user/infrastructure/repositories/interface/IUserCredentialType.repository";
import {UserCredentialTypeTransform} from "@user/domain/transformers/userCredentialType.transformer";
import {ResultType} from "@coreShared/types/result.type";

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
        const filter: UserCredentialTypeDtoBaseType["FilterDTO"] = {
             description: UserCredentialTypeTransform.normalizeDescription(description),
        }

        const founded: ResultType<UserCredentialTypeEntity> = await this.repo.findOneExactByFilter(filter);

        const entity: UserCredentialTypeEntity | null = founded.unwrapOrNull();

        if (!entity) {
            throw new NotFoundError(EntitiesMessage.error.retrieval.notFound(this.entityClass.name))
        }

        return entity;
    }

    //#region HELPERS
    @LogError()
    protected async createEntity(data: UserCredentialTypeDtoBaseType["CreateDTO"], statusId: number): Promise<UserCredentialTypeEntity> {
        return UserCredentialTypeEntity.create({
            description: data.description,
            statusId
        });
    }

    @LogError()
    protected async uniquenessValidatorEntity(entity: UserCredentialTypeEntity): Promise<void> {
        const isUnique: boolean = await this.uniquenessValidator.validate('description', entity.description);

        if (!isUnique) throw new ConflictError(EntitiesMessage.error.conflict.duplicateValue(UserCredentialTypeEntity.name, 'description'));
    }

    @LogError()
    protected filterTransform(input: UserCredentialTypeDtoBaseType['FilterDTO']): UserCredentialTypeDtoBaseType['FilterDTO'] {
        const transformedFilter: UserCredentialTypeDtoBaseType['FilterDTO'] = {...input};

        if (input.description !== undefined) {
            if (Array.isArray(input.description)) {
                transformedFilter.description = input.description.map(desc =>
                    UserCredentialTypeTransform.normalizeDescription(desc)
                );
            } else {
                transformedFilter.description = UserCredentialTypeTransform.normalizeDescription(input.description);
            }
        }

        return transformedFilter;
    }

    @LogError()
    protected async validateForeignKeys(data: Partial<UserCredentialTypeDtoBaseType["DTO"]>): Promise<void> {
        const validateExistence = async <T>(
            field: keyof UserCredentialTypeDtoBaseType["DTO"],
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
    protected async handleBusinessRules(oldEntity: UserCredentialTypeEntity, newEntity: UserCredentialTypeEntity): Promise<void> {
        if (newEntity.description !== oldEntity.description) {
            await this.uniquenessValidatorEntity(newEntity);
        }
    }

    //#endregion
}