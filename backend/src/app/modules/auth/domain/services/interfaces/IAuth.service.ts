import {LoginDTO, LoginResponseDTO} from "@modules/auth/adapters/dtos/auth.dto";

export interface IAuthService {
    login(input: LoginDTO): Promise<LoginResponseDTO>;
}