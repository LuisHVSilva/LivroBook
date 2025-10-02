import {EntitiesNamesEnum} from "@coreShared/enums/entitiesNamesEnum";

export type EntityMap = Record<string, EntitiesNamesEnum>;

export type ModelAttributeRequestDto = {
    entityName: string;
}

export type GetAllEntitiesNamesDTO = Record<string, EntityMap>