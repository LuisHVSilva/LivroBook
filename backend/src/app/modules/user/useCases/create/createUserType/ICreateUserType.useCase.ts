import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {CreateUserTypeDTO, CreateUserTypeResponseDTO} from "@user/adapters/dtos/userType.dto";

export interface ICreateUserTypeUseCase extends IUseCase<CreateUserTypeDTO, CreateUserTypeResponseDTO> {
}