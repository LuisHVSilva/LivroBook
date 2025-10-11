import {IUserTypeController} from "@user/adapters/controllers/interfaces/IUserType.controller";
import {IUserCredentialTypeController} from "@user/adapters/controllers/interfaces/IUserCredentialType.controller";
import {IControllerBase} from "@coreShared/base/interfaces/IControllerBase";

export interface IUserController extends IControllerBase {
    userTypeController: IUserTypeController;

    userCredentialTypeController: IUserCredentialTypeController;
}