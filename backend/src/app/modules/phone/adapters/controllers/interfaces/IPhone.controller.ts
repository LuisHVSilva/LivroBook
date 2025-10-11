import {IControllerBase} from "@coreShared/base/interfaces/IControllerBase";
import {IPhoneTypeController} from "@phone/adapters/controllers/interfaces/IPhoneType.controller";
import {IPhoneCodeController} from "@phone/adapters/controllers/interfaces/IPhoneCode.controller";

export interface IPhoneController extends IControllerBase {
    phoneTypeController: IPhoneTypeController;

    phoneCodeController: IPhoneCodeController;
}