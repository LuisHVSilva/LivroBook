import {IRepositoryBase} from "@coreShared/base/interfaces/IRepositoryBase";
import {UserCredentialBaseRepositoryType} from "@user/adapters/dtos/userCredential.dto";


export interface IUserCredentialRepository extends IRepositoryBase<UserCredentialBaseRepositoryType> {
}