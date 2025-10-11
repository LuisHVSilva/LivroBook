import {IServiceBase} from "@coreShared/base/interfaces/IServiceBase";
import {UserCredentialDtoBaseType} from "@user/adapters/dtos/userCredential.dto";
import {UserCredentialEntity} from "@user/domain/entities/userCredential.entity";
import {UserEntity} from "@user/domain/entities/user.entity";
import {ResultType} from "@coreShared/types/result.type";

export interface IUserCredentialService extends IServiceBase<UserCredentialDtoBaseType, UserCredentialEntity> {
    validateLoginCredential(user: UserEntity, password: string, ip: string): Promise<ResultType<UserCredentialEntity>>;
}