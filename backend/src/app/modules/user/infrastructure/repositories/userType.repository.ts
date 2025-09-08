import {inject, injectable} from "tsyringe";
import {RepositoryBase} from "@coreShared/base/repository.base";
import {
    IUserTypeRepository,
    UserTypeBaseRepositoryType
} from "@user/infrastructure/repositories/interface/IUserType.repository";
import {UserTypeModel} from "@user/infrastructure/models/userType.model";
import {ModelStatic} from "sequelize";
import {UserTypeFilterDTO, UserTypePersistenceDTO} from "@user/adapters/dtos/userType.dto";
import {SequelizeWhereBuilderUtil} from "@coreShared/utils/sequelizeWhereBuilder.util";
import {UserTypeEntity} from "@user/domain/entities/userType.entity";


@injectable()
export class UserTypeRepository extends RepositoryBase<UserTypeBaseRepositoryType> implements IUserTypeRepository {
    constructor(
        @inject("UserTypeModel") model: ModelStatic<UserTypeModel>,
    ) {
        super(model);
    }

    protected override makeFilter(filters?: UserTypeFilterDTO): SequelizeWhereBuilderUtil<UserTypeFilterDTO> {
        return super.makeFilter(filters, {
            id: { in: true },
            description: { like: true },
            statusId: { in: true },
        });
    }



    protected toPersistence(entity: UserTypeEntity): UserTypePersistenceDTO {
        return {
            description: entity.description,
            statusId: entity.statusId,
        };
    }

    protected toEntity(model: UserTypeModel): UserTypeEntity {
        return UserTypeEntity.create({
            id: model.id,
            description: model.description,
            statusId: model.statusId,
        });
    }
}