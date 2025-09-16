import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {UpdateUserCredentialDTO, UpdateUserCredentialResponseDTO} from "@user/adapters/dtos/userCredential.dto";
import {UpdateResultType} from "@coreShared/types/crudResult.type";

export interface IUpdateUserCredentialUseCase extends IUseCase<UpdateUserCredentialDTO, UpdateResultType<UpdateUserCredentialResponseDTO>> {
}