import {inject, injectable} from "tsyringe";
import {RepositoryBase} from "@coreShared/base/repository.base";
import {ModelStatic} from "sequelize";
import {SequelizeWhereBuilderUtil} from "@coreShared/utils/sequelizeWhereBuilder.util";
import {UserCredentialBaseRepositoryType} from "@user/adapters/dtos/userCredential.dto";
import {IUserCredentialRepository} from "@user/infrastructure/repositories/interface/IUserCredential.repository";
import {UserCredentialModel} from "@user/infrastructure/models/userCredential.model";
import {UserCredentialEntity} from "@user/domain/entities/userCredential.entity";


@injectable()
export class UserCredentialRepository extends RepositoryBase<UserCredentialBaseRepositoryType> implements IUserCredentialRepository {
    constructor(
        @inject("UserCredentialModel") model: ModelStatic<UserCredentialModel>,
    ) {
        super(model);
    }

    protected override makeFilter(filters?: UserCredentialBaseRepositoryType["Filter"]): SequelizeWhereBuilderUtil<UserCredentialBaseRepositoryType["Filter"]> {
        return super.makeFilter(filters, {
            id: {in: true},
            password: {like: true},
            loginAttempts: {in: true},
            // isTwoFactorEnable: boolean;
            // isEmailVerified: boolean;
            lastLoginIP: {like: true},
            lastLoginAt: {in: true},
            userCredentialTypeId: {in: true},
            statusId: {in: true},
        });
    }

    protected toPersistence(entity: UserCredentialBaseRepositoryType["Entity"]): UserCredentialBaseRepositoryType["Persistence"] {
        return {
            password: entity.password,
            loginAttempts: entity.loginAttempts,
            isTwoFactorEnable: entity.isTwoFactorEnable,
            isEmailVerified: entity.isEmailVerified,
            lastLoginIP: entity.lastLoginIp,
            lastLoginAt: entity.lastLoginAt,
            userCredentialTypeId: entity.userCredentialTypeId,
            statusId: entity.statusId,
        };
    }

    protected toEntity(model: UserCredentialBaseRepositoryType["Model"]): UserCredentialBaseRepositoryType["Entity"] {
        return new UserCredentialEntity({
            id: model.id,
            password: model.password,
            loginAttempts: model.loginAttempts,
            isTwoFactorEnable: model.isTwoFactorEnable,
            isEmailVerified: model.isEmailVerified,
            lastLoginIp: model.lastLoginIp,
            lastLoginAt: model.lastLoginAt,
            userCredentialTypeId: model.userCredentialTypeId,
            statusId: model.statusId,
        });
    }
}