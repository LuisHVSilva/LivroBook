import {SimplifiedMetadataAttribute} from "@coreShared/types/metadata.type";

export interface IMetadataService{
    getModelAttributes(modelName: string): Promise<SimplifiedMetadataAttribute[]>;
    getAllEntitiesNames(): {};
}