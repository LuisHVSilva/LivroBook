import {container} from "@coreConfig/container"
import {ILocationController} from "@location/adapters/controllers/interfaces/ILocation.controller";

export const makeLocationController = (): ILocationController => {
    return container.resolve<ILocationController>("ILocationController");
};
