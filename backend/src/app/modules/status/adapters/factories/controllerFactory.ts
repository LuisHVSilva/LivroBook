import {container} from "../../../../../core/config/container"
import {StatusController} from "../controllers/statusController";

export const makeStatusController = (): StatusController => {
    return container.resolve<StatusController>("StatusController");
};
