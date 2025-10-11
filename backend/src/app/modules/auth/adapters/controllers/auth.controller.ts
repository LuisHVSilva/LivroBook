import {inject, injectable} from "tsyringe";
import {IAuthController} from "@modules/auth/adapters/controllers/IAuth.controller";
import {ILoginUseCase} from "@modules/auth/useCases/login/ILogin.useCase";
import {LogExecution} from "@coreShared/decorators/LogExecution";
import {Request, Response} from "express";
import {LoginDTO, LoginResponseDTO} from "@modules/auth/adapters/dtos/auth.dto";
import {ResultType} from "@coreShared/types/result.type";
import {StatusCodes} from "http-status-codes";
import {ApiResponseUtil} from "@coreShared/utils/apiResponse.util";
import {IpUtils} from "@coreShared/utils/ip.util";

@injectable()
export class AuthController implements IAuthController {
    constructor(
        @inject("ILoginUseCase") private loginUseCase: ILoginUseCase,
    ) {
    }

    @LogExecution()
    async login(req: Request, res: Response): Promise<Response> {
        const input: LoginDTO = req.body;
        input.ip = IpUtils.getRequestIp(req);

        const result: ResultType<LoginResponseDTO> = await this.loginUseCase.execute(input);

        if (result.isSuccess()) {
            return ApiResponseUtil.success<LoginResponseDTO>(res, result.unwrap(), StatusCodes.OK);
        }

        return ApiResponseUtil.handleResultError(res, result.getError());
    }
}