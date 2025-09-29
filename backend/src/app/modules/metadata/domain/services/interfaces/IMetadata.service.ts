import {SimplifiedMetadataAttribute} from "@coreShared/types/metadata.type";
import {EntitiesNamesEnum} from "@coreShared/enums/entitiesNamesEnum";

export interface IMetadataService{
    getModelAttributes(modelName: string): Promise<SimplifiedMetadataAttribute[]>;
    getAllEntitiesNames(): EntitiesNamesEnum[];
}