import {container} from "tsyringe";
import {EntityUniquenessValidator} from "@coreShared/validators/entityUniqueness.validator";
import {IRepositoryBase} from "@coreShared/base/interfaces/IRepositoryBase";
import {IDocumentTypeService} from "@document/domain/services/interfaces/IDocumentType.service";
import {DocumentTypeService} from "@document/domain/services/documentType.service";
import {ICreateDocumentTypeUseCase} from "@document/useCases/create/createDocumentType/ICreateDocumentType.useCase";
import {CreateDocumentTypeUseCase} from "@document/useCases/create/createDocumentType/createDocumentType.useCase";
import {IDocumentTypeController} from "@document/adapters/controllers/interfaces/IDocumentType.controller";
import {DocumentTypeController} from "@document/adapters/controllers/documentType.controller";
import {DocumentTypeRepository} from "@document/infrastructure/repositories/documentType.repository";
import {IDocumentTypeRepository} from "@document/infrastructure/repositories/interface/IDocumentType.repository";
import {IFindDocumentTypesUseCase} from "@document/useCases/read/findDocumentTypes/IFindDocumentTypes.useCase";
import {FindDocumentTypesUseCase} from "@document/useCases/read/findDocumentTypes/findDocumentTypes.useCase";
import {IUpdateDocumentTypeUseCase} from "@document/useCases/update/updateDocumentType/IUpdateDocumentType.useCase";
import {UpdateDocumentTypeUseCase} from "@document/useCases/update/updateDocumentType/updateDocumentType.useCase";
import {IDeleteDocumentTypesUseCase} from "@document/useCases/delete/deleteDocumentTypes/IDeleteDocumentTypes.useCase";
import {DeleteDocumentTypesUseCase} from "@document/useCases/delete/deleteDocumentTypes/deleteDocumentTypes.useCase";
import {DocumentTypeModel} from "@document/infrastructure/models/documentType.model";
import {ModelStatic} from "sequelize";
import {DocumentTypeBaseRepositoryType} from "@document/adapters/dto/documentType.dto";
import {IFindDocumentTypeByIdUseCase} from "@document/useCases/read/findDocumentTypeById/IFindDocumentTypeById.useCase";
import {FindDocumentTypeByIdUseCase} from "@document/useCases/read/findDocumentTypeById/findDocumentTypeById.useCase";
import {IDocumentController} from "@document/adapters/controllers/interfaces/IDocument.controller";
import {DocumentController} from "@document/adapters/controllers/document.controller";

//#region Services
container.registerSingleton<IDocumentTypeService>("IDocumentTypeService", DocumentTypeService);
//#endregion

//#region UseCases
container.registerSingleton<ICreateDocumentTypeUseCase>("ICreateDocumentTypeUseCase", CreateDocumentTypeUseCase);
container.registerSingleton<IFindDocumentTypeByIdUseCase>("IFindDocumentTypeByIdUseCase", FindDocumentTypeByIdUseCase);
container.registerSingleton<IFindDocumentTypesUseCase>("IFindDocumentTypesUseCase", FindDocumentTypesUseCase);
container.registerSingleton<IUpdateDocumentTypeUseCase>("IUpdateDocumentTypeUseCase", UpdateDocumentTypeUseCase);
container.registerSingleton<IDeleteDocumentTypesUseCase>("IDeleteDocumentTypesUseCase", DeleteDocumentTypesUseCase);
// #endregion

//#region Infrastructure
container.register<ModelStatic<DocumentTypeModel>>("DocumentTypeModel", {useValue: DocumentTypeModel});
container.registerSingleton<IDocumentTypeRepository>("IDocumentTypeRepository", DocumentTypeRepository);
//#endregion

//#region Adapters
container.registerSingleton<IDocumentTypeController>("IDocumentTypeController", DocumentTypeController);
container.registerSingleton<IDocumentController>("IDocumentController", DocumentController);
//#endregion

//#region Validators
container.registerSingleton<EntityUniquenessValidator<DocumentTypeBaseRepositoryType>>("DocumentTypeUniquenessValidator", EntityUniquenessValidator);
container.registerSingleton<IRepositoryBase<DocumentTypeBaseRepositoryType>>("DocumentTypeRepository", DocumentTypeRepository);
//#endregion

export {container};
