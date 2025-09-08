import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {UpdateResultType} from "@coreShared/types/crudResult.type";
import {UpdateUserCredentialTypeDTO} from "@user/adapters/dtos/userCredentialType.dto";
import {UserCredentialTypeEntity} from "@user/domain/entities/userCredentialType.entity";

export interface IUpdateUserCredentialTypeUseCase extends IUseCase<UpdateUserCredentialTypeDTO, UpdateResultType<UserCredentialTypeEntity>> {
}