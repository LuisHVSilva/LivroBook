import {inject, injectable} from "tsyringe";
import {IDocumentTypeController} from "@document/adapters/controllers/interfaces/IDocumentType.controller";
import {ICreateDocumentTypeUseCase} from "@document/useCases/create/createDocumentType/ICreateDocumentType.useCase";
import {DocumentTypeAbstractControllerBaseType} from "@document/adapters/dto/documentType.dto";
import {IFindDocumentTypesUseCase} from "@document/useCases/read/findDocumentTypes/IFindDocumentTypes.useCase";
import {IDeleteDocumentTypesUseCase} from "@document/useCases/delete/deleteDocumentTypes/IDeleteDocumentTypes.useCase";
import {ControllerBase} from "@coreShared/base/controller.base";
import {IFindDocumentTypeByIdUseCase} from "@document/useCases/read/findDocumentTypeById/IFindDocumentTypeById.useCase";
import {IUpdateDocumentTypeUseCase} from "@document/useCases/update/updateDocumentType/IUpdateDocumentType.useCase";

@injectable()
export class DocumentTypeController extends ControllerBase<DocumentTypeAbstractControllerBaseType> implements IDocumentTypeController {
    constructor(
        @inject("ICreateDocumentTypeUseCase")
        protected readonly createDocumentTypeUseCase: ICreateDocumentTypeUseCase,
        @inject("IFindDocumentTypeByIdUseCase")
        protected readonly findDocumentTypeByIdUseCase: IFindDocumentTypeByIdUseCase,
        @inject("IFindDocumentTypesUseCase")
        protected readonly findDocumentTypesUseCase: IFindDocumentTypesUseCase,
        @inject("IUpdateDocumentTypeUseCase")
        protected readonly updateDocumentTypeUseCase: IUpdateDocumentTypeUseCase,
        @inject("IDeleteDocumentTypesUseCase")
        protected readonly deleteDocumentTypesUseCase: IDeleteDocumentTypesUseCase,
    ) {
        super(createDocumentTypeUseCase,
            findDocumentTypeByIdUseCase,
            findDocumentTypesUseCase,
            updateDocumentTypeUseCase,
            deleteDocumentTypesUseCase
        )
    }
}