import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {CreateUserRequestDTO, CreateUserResponseDTO} from "@user/adapters/dtos/user.dto";

export interface ICreateUserUseCase extends IUseCase<CreateUserRequestDTO, CreateUserResponseDTO> {

}