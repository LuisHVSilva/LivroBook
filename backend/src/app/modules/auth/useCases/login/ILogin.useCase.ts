import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {LoginDTO, LoginResponseDTO} from "@modules/auth/adapters/dtos/auth.dto";

export interface ILoginUseCase extends IUseCase<LoginDTO, LoginResponseDTO> {
    
}