import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {
    CreateUserCredentialTypeDTO,
    CreateUserCredentialTypeResponseDTO
} from "@user/adapters/dtos/userCredentialType.dto";

export interface ICreateUserCredentialTypeUseCase extends IUseCase<CreateUserCredentialTypeDTO, CreateUserCredentialTypeResponseDTO> {
}