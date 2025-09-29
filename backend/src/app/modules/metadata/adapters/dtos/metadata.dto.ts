import {EntitiesNamesEnum} from "@coreShared/enums/entitiesNamesEnum";

export type ModelAttributeRequestDto = {
    entityName: string;
}

export type GetAllEntitiesNamesDTO = EntitiesNamesEnum[]