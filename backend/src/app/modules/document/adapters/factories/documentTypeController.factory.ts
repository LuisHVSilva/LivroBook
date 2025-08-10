import {container} from "@coreConfig/container"
import {IDocumentTypeController} from "@document/adapters/controllers/IDocumentType.controller";

export const makeDocumentTypeController = (): IDocumentTypeController => {
    return container.resolve<IDocumentTypeController>("IDocumentTypeController");
};
