import {IServiceBase} from "@coreShared/base/interfaces/IServiceBase";
import {UserTypeDtoBaseType,} from "@user/adapters/dtos/userType.dto";
import {UserTypeEntity} from "@user/domain/entities/userType.entity";


export interface IUserTypeService extends IServiceBase<UserTypeDtoBaseType, UserTypeEntity> {
    // getExactByDescription(description: string): Promise<UserTypeEntity>;
    getStandardUserType(): Promise<UserTypeEntity>;
}