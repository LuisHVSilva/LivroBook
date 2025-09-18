import {container} from "tsyringe";
import {IAuthService} from "@modules/auth/domain/services/interfaces/IAuth.service";
import {AuthService} from "@modules/auth/domain/services/auth.service";
import {ILoginUseCase} from "@modules/auth/useCases/login/ILogin.useCase";
import {LoginUseCase} from "@modules/auth/useCases/login/login.useCase";
import {IAuthController} from "@modules/auth/adapters/controllers/IAuth.controller";
import {AuthController} from "@modules/auth/adapters/controllers/auth.controller";

//#region Services
container.registerSingleton<IAuthService>("IAuthService", AuthService);
//#endregion

//#region UseCases
container.registerSingleton<ILoginUseCase>("ILoginUseCase", LoginUseCase);
// #endregion

//#region Adapters
container.registerSingleton<IAuthController>("IAuthController", AuthController);
//#endregion

export {container};
