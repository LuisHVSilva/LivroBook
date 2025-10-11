import {container} from "@coreConfig/container"
import {IPhoneController} from "@phone/adapters/controllers/interfaces/IPhone.controller";

export const makePhoneController = (): IPhoneController => {
    return container.resolve<IPhoneController>("IPhoneController");
};
