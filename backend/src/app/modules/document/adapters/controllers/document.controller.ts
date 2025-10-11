import {inject, injectable} from "tsyringe";
import {IDocumentController} from "@document/adapters/controllers/interfaces/IDocument.controller";
import {IDocumentTypeController} from "@document/adapters/controllers/interfaces/IDocumentType.controller";

@injectable()
export class DocumentController implements IDocumentController {
    constructor(
        @inject("IDocumentTypeController")
        public readonly documentTypeController: IDocumentTypeController,
    ) {
    }

    //#region DOCUMENT TYPE

    //#endregion
}