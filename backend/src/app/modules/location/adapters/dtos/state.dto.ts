// ---------- BASE ----------
import {BaseRepositoryType, DtoBaseType} from "@coreShared/types/entity.type";
import {StateModel} from "@location/infrastructure/models/state.model";
import {StateEntity} from "@location/domain/entities/state.entity";

export type StateDTO = {
    id?: number;
    description: string;
    statusId: number;
    countryId: number;
};

// --------- FILTER ---------
export type StateFilterDTO = {
    id?: number[];
    description?: string[];
    countryId?: number[];
    statusId?: number[];
}

// ------- PERSISTENCE ------
export type StatePersistenceDTO = Omit<StateDTO, "id">;

// ---------- CREATE ----------
export type CreateStateDTO = Pick<StateDTO, "description" | "countryId">;
export type CreateStateResponseDTO = StateDTO;

// ---------- UPDATE ----------
export type UpdateStateDTO = Partial<Omit<StateDTO, "id">> & { id: number };
export type UpdateStateResponseDTO = StateDTO;

// ---------- FIND ----------
export type FindStatesRawDTO = {
    id?: string;
    description?: string;
    countryId?: string;
    statusId?: string;
    page?: string;
    limit?: string;
};
export type FindStatesResponseDTO = {
    page?: number;
    limit?: number;
    totalPages?: number;
    data: StateDTO[];
};

// ------ DTO BASE TYPE -------
export type StateDtoBaseType = DtoBaseType<
    StateDTO,
    CreateStateDTO,
    FindStatesRawDTO,
    UpdateStateDTO,
    StateFilterDTO
>

// ------ BASE REPOSITORY TYPE -------
export type StateBaseRepositoryType = BaseRepositoryType<StateModel, StateEntity, StateFilterDTO, StatePersistenceDTO>