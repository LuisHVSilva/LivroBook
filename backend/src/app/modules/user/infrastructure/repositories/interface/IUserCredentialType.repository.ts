import {BaseRepositoryType} from "@coreShared/types/entity.type";
import {IRepositoryBase} from "@coreShared/base/interfaces/IRepositoryBase";
import {UserCredentialTypeModel} from "@user/infrastructure/models/userCredentialType.model";
import {UserCredentialTypeEntity} from "@user/domain/entities/userCredentialType.entity";
import {
    UserCredentialTypeFilterDTO,
    UserCredentialTypePersistenceDTO
} from "@user/adapters/dtos/userCredentialType.dto";


export type UserCredentialTypeBaseRepositoryType = BaseRepositoryType<
    UserCredentialTypeModel,
    UserCredentialTypeEntity,
    UserCredentialTypeFilterDTO,
    UserCredentialTypePersistenceDTO
>;

export interface IUserCredentialTypeRepository extends IRepositoryBase<UserCredentialTypeBaseRepositoryType> {
}