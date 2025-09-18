import {IServiceBase} from "@coreShared/base/interfaces/IServiceBase";
import {CreateUserCredentialRequestDTO, UserCredentialDtoBaseType} from "@user/adapters/dtos/userCredential.dto";
import {UserCredentialEntity} from "@user/domain/entities/userCredential.entity";
import {Transaction} from "sequelize";


export interface IUserCredentialService extends IServiceBase<UserCredentialDtoBaseType, UserCredentialEntity> {
    create(data: CreateUserCredentialRequestDTO, transaction: Transaction): Promise<UserCredentialEntity>;

    isPasswordValid(userCredentialId: number, password: string): Promise<boolean>;
}