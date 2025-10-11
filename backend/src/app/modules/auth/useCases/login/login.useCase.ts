import {inject, injectable} from "tsyringe";
import {ILoginUseCase} from "@modules/auth/useCases/login/ILogin.useCase";
import {IAuthService} from "@modules/auth/domain/services/interfaces/IAuth.service";
import {LogExecution} from "@coreShared/decorators/LogExecution";
import {LoginDTO, LoginResponseDTO} from "@modules/auth/adapters/dtos/auth.dto";
import {ResultType} from "@coreShared/types/result.type";
import {UseCaseResponseUtil} from "@coreShared/utils/useCaseResponse.util";

@injectable()
export class LoginUseCase implements ILoginUseCase {
    constructor(
        @inject("IAuthService") private authService: IAuthService
    ) {
    }


    @LogExecution()
    async execute(input: LoginDTO): Promise<ResultType<LoginResponseDTO>> {
        try {
            return await this.authService.login(input);
        } catch (error) {
            return UseCaseResponseUtil.handleResultError(error);
        }
    }
}