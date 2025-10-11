// ---------- BASE ----------
import {BaseRepositoryType, DtoBaseType} from "@coreShared/types/entity.type";
import {StateModel} from "@location/infrastructure/models/state.model";
import {StateEntity, StateProps} from "@location/domain/entities/state.entity";
import {AbstractControllerBaseType} from "@coreShared/types/controller.type";

export type StateDTO = StateProps;

// --------- FILTER ---------
export type StateFilterDTO = {
    id?: number | number[];
    description?: string | string[];
    country?: string | string[];
    status?: string | string[];
}

// ------- PERSISTENCE ------
export type StatePersistenceDTO = Omit<StateDTO, "id">;

// ---------- CREATE ----------
export type CreateStateDTO = Pick<StateDTO, "description" | "country">;
export type CreateStateResponseDTO = StateDTO;

// ---------- UPDATE ----------
export type UpdateStateDTO = Partial<Omit<StateDTO, "id">> & { id: number };
export type UpdateStateResponseDTO = StateDTO;

// ---------- FIND ----------
export type FindByIdStateResponseDTO = StateDTO;

export type FindStatesRawDTO = {
    id?: string;
    description?: string;
    country?: string;
    status?: string;
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
export interface StateNormalizedRelations {
    countryId: number;
    statusId: number;
}
export type StateBaseRepositoryType = BaseRepositoryType<
    StateModel,
    StateEntity,
    StateFilterDTO,
    StatePersistenceDTO,
    StateNormalizedRelations
>;

// ------ BASE CONTROLLER TYPE -------
export type StateAbstractControllerBaseType = AbstractControllerBaseType<
    StateProps,
    CreateStateDTO,
    CreateStateResponseDTO,
    FindByIdStateResponseDTO,
    FindStatesRawDTO,
    FindStatesResponseDTO,
    UpdateStateDTO,
    UpdateStateResponseDTO
>