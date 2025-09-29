import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {UpdateResultType} from "@coreShared/types/crudResult.type";
import {
    UpdateUserCredentialTypeDTO,
    UpdateUserCredentialTypeResponseDTO
} from "@user/adapters/dtos/userCredentialType.dto";

export interface IUpdateUserCredentialTypeUseCase extends IUseCase<UpdateUserCredentialTypeDTO, UpdateResultType<UpdateUserCredentialTypeResponseDTO>> {
}