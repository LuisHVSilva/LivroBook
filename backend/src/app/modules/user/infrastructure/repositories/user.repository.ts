import {inject, injectable} from "tsyringe";
import {RepositoryBase} from "@coreShared/base/repository.base";
import {ModelStatic} from "sequelize";
import {SequelizeWhereBuilderUtil} from "@coreShared/utils/sequelizeWhereBuilder.util";
import {UserBaseRepositoryType} from "@user/adapters/dtos/user.dto";
import {IUserRepository} from "@user/infrastructure/repositories/interface/IUser.repository";
import {UserModel} from "@user/infrastructure/models/user.model";
import {UserEntity} from "@user/domain/entities/user.entity";


@injectable()
export class UserRepository extends RepositoryBase<UserBaseRepositoryType> implements IUserRepository {
    constructor(
        @inject("UserModel") model: ModelStatic<UserModel>,
    ) {
        super(model);
    }

    protected override makeFilter(filters?: UserBaseRepositoryType["Filter"]): SequelizeWhereBuilderUtil<UserBaseRepositoryType["Filter"]> {
        return super.makeFilter(filters, {
            id: { in: true },
            name: { like: true },
            email: { like: true },
            document: { like: true },
            birthday: { in: true },
            userTypeId: { in: true },
            cityId: { in: true },
            userCredentialId: { in: true },
            documentTypeId: { in: true },
            phoneId: { in: true },
            statusId: { in: true },
        });
    }

    protected toPersistence(entity: UserBaseRepositoryType["Entity"]): UserBaseRepositoryType["Persistence"] {
        return {
            name: entity.name,
            email: entity.email,
            document: entity.document,
            birthday: entity.birthday,
            userTypeId: entity.userTypeId,
            cityId: entity.cityId,
            userCredentialId: entity.userCredentialId,
            documentTypeId: entity.documentTypeId,
            phoneId: entity.phoneId,
            statusId: entity.statusId,
        };
    }

    protected toEntity(model: UserBaseRepositoryType["Model"]): UserBaseRepositoryType["Entity"] {
        return UserEntity.create({
            id: model.id,
            name: model.name,
            email: model.email,
            document: model.document,
            birthday: model.birthday,
            userTypeId: model.userTypeId,
            cityId: model.cityId,
            userCredentialId: model.userCredentialId,
            documentTypeId: model.documentTypeId,
            phoneId: model.phoneId,
            statusId: model.statusId,
        });
    }
}