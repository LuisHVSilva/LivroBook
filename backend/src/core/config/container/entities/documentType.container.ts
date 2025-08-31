import {container} from "tsyringe";
import {EntityUniquenessValidator} from "@coreShared/validators/entityUniqueness.validator";
import {IRepositoryBase} from "@coreShared/base/interfaces/IRepositoryBase";
import {IDocumentTypeService} from "@document/domain/services/interfaces/IDocumentType.service";
import {DocumentTypeService} from "@document/domain/services/documentType.service";
import {ICreateDocumentTypeUseCase} from "@document/useCases/createDocumentType/ICreateDocumentType.useCase";
import {CreateDocumentTypeUseCase} from "@document/useCases/createDocumentType/createDocumentType.useCase";
import {IDocumentTypeController} from "@document/adapters/controllers/IDocumentType.controller";
import {DocumentTypeController} from "@document/adapters/controllers/documentType.controller";
import {DocumentTypeRepository} from "@document/infrastructure/repositories/documentType.repository";
import {
    DocumentTypeBaseRepositoryType,
    IDocumentTypeRepository
} from "@document/infrastructure/repositories/interface/IDocumentType.repository";
import {IFindDocumentTypesUseCase} from "@document/useCases/findDocumentTypes/IFindDocumentTypes.useCase";
import {FindDocumentTypesUseCase} from "@document/useCases/findDocumentTypes/findDocumentTypes.useCase";
import {IUpdateDocumentTypeUseCase} from "@document/useCases/updateDocumentType/IUpdateDocumentType.useCase";
import {UpdateDocumentTypeUseCase} from "@document/useCases/updateDocumentType/updateDocumentType.useCase";
import {IDeleteDocumentTypesUseCase} from "@document/useCases/deleteDocumentTypes/IDeleteDocumentTypes.useCase";
import {DeleteDocumentTypesUseCase} from "@document/useCases/deleteDocumentTypes/deleteDocumentTypes.useCase";
import {DocumentTypeModel} from "@document/infrastructure/models/documentType.model";
import {ModelStatic} from "sequelize";

//#region Services
container.registerSingleton<IDocumentTypeService>("IDocumentTypeService", DocumentTypeService);
//#endregion

//#region UseCases
container.registerSingleton<ICreateDocumentTypeUseCase>("ICreateDocumentTypeUseCase", CreateDocumentTypeUseCase);
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
//#endregion

//#region Validators
container.registerSingleton<EntityUniquenessValidator<DocumentTypeBaseRepositoryType>>("DocumentTypeUniquenessValidator", EntityUniquenessValidator);
container.registerSingleton<IRepositoryBase<DocumentTypeBaseRepositoryType>>("DocumentTypeRepository", DocumentTypeRepository);
//#endregion

export {container};
