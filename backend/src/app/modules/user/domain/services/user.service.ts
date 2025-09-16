import {inject, injectable} from "tsyringe";
import {EntityUniquenessValidator} from "@coreShared/validators/entityUniqueness.validator";
import {EntityUniquenessValidatorFactory} from "@coreShared/factories/entityUniquenessValidator.factory";
import {IRepositoryBase} from "@coreShared/base/interfaces/IRepositoryBase";
import {LogError} from "@coreShared/decorators/LogError";
import {ConflictError} from "@coreShared/errors/domain.error";
import {EntitiesMessage} from "@coreShared/messages/entities.message";
import {IStatusService} from "@status/domain/services/interfaces/IStatus.service";
import {ServiceBase} from "@coreShared/base/service.base";
import {UserEntity} from "@user/domain/entities/user.entity";
import {IUserService} from "@user/domain/services/interface/IUser.service";
import {UserBaseRepositoryType,UserDtoBaseType} from "@user/adapters/dtos/user.dto";
import {IUserRepository} from "@user/infrastructure/repositories/interface/IUser.repository";
import {IUserTypeService} from "@user/domain/services/interface/IUserType.service";
import {ICityService} from "@location/domain/services/interfaces/ICity.service";
import {IUserCredentialService} from "@user/domain/services/interface/IUserCredential.service";
import {IPhoneService} from "@phone/domain/service/interfaces/IPhone.service";

@injectable()
export class UserService extends ServiceBase<UserDtoBaseType, UserEntity> implements IUserService {
    //#region PROPERTIES
    private readonly uniquenessValidator: EntityUniquenessValidator<UserBaseRepositoryType>;
    //#endregion

    //#region CONSTRUCTOR
    constructor(
        @inject("IUserRepository") protected readonly repo: IUserRepository,
        @inject("EntityUniquenessValidatorFactory") private readonly validatorFactory: EntityUniquenessValidatorFactory,
        @inject("UserRepository") private readonly userRepo: IRepositoryBase<UserBaseRepositoryType>,
        @inject('IStatusService') protected readonly statusService: IStatusService,
        @inject("IUserTypeService") protected readonly userTypeService: IUserTypeService,
        @inject("ICityService") protected readonly cityService: ICityService,
        @inject("IUserCredentialService") protected readonly userCredentialService: IUserCredentialService,
        @inject("IPhoneService") protected readonly phoneService: IPhoneService,
    ) {
        super(repo, UserEntity, statusService);
        this.uniquenessValidator = this.validatorFactory(this.userRepo);
    }

    //#endregion

    //#region HELPERS
    @LogError()
    protected async createEntity(data: UserDtoBaseType["CreateDTO"], statusId: number): Promise<UserEntity> {
        return UserEntity.create({
            ...data,
            statusId
        });
    }

    @LogError()
    protected async uniquenessValidatorEntity(entity: UserEntity): Promise<void> {
        const isUniqueEmail: boolean = await this.uniquenessValidator.validate('email', entity.email);

        if (!isUniqueEmail) {
            throw new ConflictError(EntitiesMessage.error.conflict.duplicateValue(UserEntity.name, 'email'));
        }

        const isUniqueDocument: boolean = await this.uniquenessValidator.validate('document', entity.document);

        if (!isUniqueDocument) {
            throw new ConflictError(EntitiesMessage.error.conflict.duplicateValue(UserEntity.name, 'document'));
        }
    }

    @LogError()
    protected filterTransform(input: UserDtoBaseType['FilterDTO']): UserDtoBaseType['FilterDTO'] {
        return input;
    }

    @LogError()
    protected async validateForeignKeys(data: Partial<UserDtoBaseType["DTO"]>): Promise<void> {
        await Promise.all([
            this.validateExistence("userTypeId", data.userTypeId, this.userTypeService),
            this.validateExistence("cityId", data.cityId, this.cityService),
            this.validateStatusExistence(data.statusId),
        ]);
    }

    //#endregion
}
