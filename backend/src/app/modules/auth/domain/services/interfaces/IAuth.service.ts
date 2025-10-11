import {LoginDTO, LoginResponseDTO} from "@modules/auth/adapters/dtos/auth.dto";
import {ResultType} from "@coreShared/types/result.type";

export interface IAuthService {
    login(input: LoginDTO): Promise<ResultType<LoginResponseDTO>>;
}