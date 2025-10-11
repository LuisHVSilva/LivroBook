import {container} from "@coreConfig/container"
import {IUserController} from "@user/adapters/controllers/interfaces/IUser.controller";

export const makeUserController = (): IUserController => {
    return container.resolve<IUserController>("IUserController");
};
