import {container} from "@coreConfig/container"
import {IStatusController} from "@status/adapters/controllers/IStatus.controller";

export const makeStatusController = (): IStatusController => {
    return container.resolve<IStatusController>("IStatusController");
};
