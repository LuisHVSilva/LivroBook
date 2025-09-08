import {BaseRepositoryType} from "@coreShared/types/entity.type";
import {UserTypeModel} from "@user/infrastructure/models/userType.model";
import {UserTypeEntity} from "@user/domain/entities/userType.entity";
import {UserTypeFilterDTO, UserTypePersistenceDTO} from "@user/adapters/dtos/userType.dto";
import {IRepositoryBase} from "@coreShared/base/interfaces/IRepositoryBase";


export type UserTypeBaseRepositoryType = BaseRepositoryType<
    UserTypeModel,
    UserTypeEntity,
    UserTypeFilterDTO,
    UserTypePersistenceDTO
>;

export interface IUserTypeRepository extends IRepositoryBase<UserTypeBaseRepositoryType> {
}