import {container} from "@coreConfig/container"
import {IPhoneController} from "@phone/adapters/controllers/IPhone.controller";

export const makePhoneController = (): IPhoneController => {
    return container.resolve<IPhoneController>("IPhoneController");
};
