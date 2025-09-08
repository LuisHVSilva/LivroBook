
import {IServiceBase} from "@coreShared/base/interfaces/IServiceBase";
import {UserCredentialTypeDtoBaseType} from "@user/adapters/dtos/userCredentialType.dto";
import {UserCredentialTypeEntity} from "@user/domain/entities/userCredentialType.entity";


export interface IUserCredentialTypeService extends IServiceBase<UserCredentialTypeDtoBaseType, UserCredentialTypeEntity> {
    getExactByDescription(description: string): Promise<UserCredentialTypeEntity>;
}