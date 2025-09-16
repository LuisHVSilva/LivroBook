import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {CreateUserCredentialRequestDTO, CreateUserCredentialResponseDTO} from "@user/adapters/dtos/userCredential.dto";

export interface ICreateUserCredentialUseCase extends IUseCase<CreateUserCredentialRequestDTO, CreateUserCredentialResponseDTO> {
}