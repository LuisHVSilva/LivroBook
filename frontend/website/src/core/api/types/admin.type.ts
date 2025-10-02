import type {Renderable} from "../../../app/components/Table.tsx";

export type GetAllEntitiesNamesDTO = Record<string, Record<string, string>>;

export type EntityProperty = {
    columnName: string;
    dataType: string;
    allowNull: boolean;
    maxLength?: number;
    minLength?: number;
}
export type GetAllModelAttributesResponseDTO = EntityProperty[];

export type GetAllEntityDataResponseDTO = {
    page: number;
    limit: number;
    totalPages: number;
    data: GetEntityByIdResponseDTO[];
};

export type GetEntityByIdResponseDTO = { id: number } & Record<string, Renderable>;