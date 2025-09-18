import {IServiceBase} from "@coreShared/base/interfaces/IServiceBase";
import {UserDtoBaseType} from "@user/adapters/dtos/user.dto";
import {UserEntity} from "@user/domain/entities/user.entity";

export interface IUserService extends IServiceBase<UserDtoBaseType, UserEntity> {
    getUserActiveByEmail(email: string): Promise<UserEntity>;
}