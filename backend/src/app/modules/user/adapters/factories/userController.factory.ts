import {container} from "@coreConfig/container"
import {IUserController} from "@user/adapters/controllers/IUser.controller";

export const makeUserController = (): IUserController => {
    return container.resolve<IUserController>("IUserController");
};
