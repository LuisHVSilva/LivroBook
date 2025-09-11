import {inject, injectable} from "tsyringe";
import {RepositoryBase} from "@coreShared/base/repository.base";
import {IUserTypeRepository} from "@user/infrastructure/repositories/interface/IUserType.repository";
import {UserTypeModel} from "@user/infrastructure/models/userType.model";
import {ModelStatic} from "sequelize";
import {UserTypeBaseRepositoryType} from "@user/adapters/dtos/userType.dto";
import {SequelizeWhereBuilderUtil} from "@coreShared/utils/sequelizeWhereBuilder.util";
import {UserTypeEntity} from "@user/domain/entities/userType.entity";


@injectable()
export class UserTypeRepository extends RepositoryBase<UserTypeBaseRepositoryType> implements IUserTypeRepository {
    constructor(
        @inject("UserTypeModel") model: ModelStatic<UserTypeModel>,
    ) {
        super(model);
    }

    protected override makeFilter(filters?: UserTypeBaseRepositoryType["Filter"]): SequelizeWhereBuilderUtil<UserTypeBaseRepositoryType["Filter"]> {
        return super.makeFilter(filters, {
            id: { in: true },
            description: { like: true },
            statusId: { in: true },
        });
    }

    protected toPersistence(entity: UserTypeBaseRepositoryType["Entity"]): UserTypeBaseRepositoryType["Persistence"] {
        return {
            description: entity.description,
            statusId: entity.statusId,
        };
    }

    protected toEntity(model: UserTypeBaseRepositoryType["Model"]): UserTypeBaseRepositoryType["Entity"] {
        return UserTypeEntity.create({
            id: model.id,
            description: model.description,
            statusId: model.statusId,
        });
    }
}