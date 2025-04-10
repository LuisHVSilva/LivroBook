import {container} from "@coreConfig/container"
import {IUserTypeController} from "@userType/adapters/controller/IUserTypeController";

export const makeUserTypeController = (): IUserTypeController => {
    return container.resolve<IUserTypeController>("IUserTypeController");
};

