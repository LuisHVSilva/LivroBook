import {inject, injectable} from "tsyringe";
import {RepositoryBase} from "@coreShared/base/repository.base";
import {ModelStatic} from "sequelize";
import {SequelizeWhereBuilderUtil} from "@coreShared/utils/sequelizeWhereBuilder.util";
import {
    IUserCredentialTypeRepository, UserCredentialTypeBaseRepositoryType
} from "@user/infrastructure/repositories/interface/IUserCredentialType.repository";
import {UserCredentialTypeModel} from "@user/infrastructure/models/userCredentialType.model";
import {UserCredentialTypeEntity} from "@user/domain/entities/userCredentialType.entity";


@injectable()
export class UserCredentialTypeRepository extends RepositoryBase<UserCredentialTypeBaseRepositoryType> implements IUserCredentialTypeRepository {
    constructor(
        @inject("UserCredentialTypeModel") model: ModelStatic<UserCredentialTypeModel>,
    ) {
        super(model);
    }

    //#region HELPERS
    protected override makeFilter(filters?: UserCredentialTypeBaseRepositoryType["Filter"]): SequelizeWhereBuilderUtil<UserCredentialTypeBaseRepositoryType["Filter"]> {
        return super.makeFilter(filters, {
            id: {in: true},
            description: {like: true},
            statusId: {in: true},
        });
    }

    protected toPersistence(entity: UserCredentialTypeBaseRepositoryType["Entity"]): UserCredentialTypeBaseRepositoryType["Persistence"] {
        return {
            description: entity.description,
            statusId: entity.statusId,
        };
    }

    protected toEntity(model: UserCredentialTypeBaseRepositoryType["Model"]): UserCredentialTypeBaseRepositoryType["Entity"] {
        return UserCredentialTypeEntity.create({
            id: model.id,
            description: model.description,
            statusId: model.statusId,
        });
    }

    //#endregion
}