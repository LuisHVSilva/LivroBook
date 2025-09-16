import {IRepositoryBase} from "@coreShared/base/interfaces/IRepositoryBase";
import {UserBaseRepositoryType} from "@user/adapters/dtos/user.dto";


export interface IUserRepository extends IRepositoryBase<UserBaseRepositoryType> {
}