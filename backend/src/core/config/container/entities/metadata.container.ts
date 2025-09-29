import {container} from "tsyringe";
import {IMetadataService} from "@modules/metadata/domain/services/interfaces/IMetadata.service";
import {MetadataService} from "@modules/metadata/domain/services/metadata.service";
import {IGetModelAttributesUseCase} from "@modules/metadata/useCase/getModelAttributes/IGetModelAttributes.useCase";
import {GetModelAttributesUseCase} from "@modules/metadata/useCase/getModelAttributes/getModelAttributes.useCase";
import {MetadataController} from "@modules/metadata/adapters/controller/metadata.controller";
import {IMetadataController} from "@modules/metadata/adapters/controller/IMetadata.controller";
import {GetAllEntitiesNamesUseCase} from "@modules/metadata/useCase/getAllEntitiesNames/getAllEntitiesNamesUseCase";
import {IGetAllEntitiesNamesUseCase} from "@modules/metadata/useCase/getAllEntitiesNames/IGetAllEntitiesNames.useCase";

//#region Services
container.registerSingleton<IMetadataService>("IMetadataService", MetadataService);
//#endregion

//#region UseCases
container.registerSingleton<IGetModelAttributesUseCase>("IGetModelAttributesUseCase", GetModelAttributesUseCase);
// #endregion

//#region Adapters
container.registerSingleton<IMetadataController>("IMetadataController", MetadataController);
container.registerSingleton<IGetAllEntitiesNamesUseCase>("IGetAllEntitiesNamesUseCase", GetAllEntitiesNamesUseCase);

//#endregion

export {container};
