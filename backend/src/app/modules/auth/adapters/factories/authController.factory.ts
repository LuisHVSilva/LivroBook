import {container} from "@coreConfig/container"
import {IAuthController} from "@modules/auth/adapters/controllers/IAuth.controller";

export const makeAuthController = (): IAuthController => {
    return container.resolve<IAuthController>("IAuthController");
};
