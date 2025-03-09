import {container} from "@coreConfig/container"
import {IStatusController} from "@status/adapters/controllers/IStatusController";

export const makeStatusController = (): IStatusController => {
    return container.resolve<IStatusController>("IStatusController");
};
