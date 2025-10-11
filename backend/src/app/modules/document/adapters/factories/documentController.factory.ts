import {container} from "@coreConfig/container"
import {IDocumentController} from "@document/adapters/controllers/interfaces/IDocument.controller";

export const makeDocumentController = (): IDocumentController => {
    return container.resolve<IDocumentController>("IDocumentController");
};
