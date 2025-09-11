// ---------- BASE ----------
import {BaseRepositoryType, DtoBaseType} from "@coreShared/types/entity.type";
import {CityModel} from "@location/infrastructure/models/city.model";
import {CityEntity} from "@location/domain/entities/city.entity";

export type CityDTO = {
    id?: number;
    description: string;
    stateId: number;
    statusId: number
}

// --------- FILTER ---------
export type CityFilterDTO = {
    id?: number[];
    description?: string[];
    stateId?: number[];
    statusId?: number[];
    page?: number;
    limit?: number;
}

// ------- PERSISTENCE ------
export type CityPersistenceDTO = Omit<CityDTO, "id">;

// ---------- CREATE ----------
export type CreateCityDTO = Pick<CityDTO, "description" | "stateId">;
export type CreateCityResponseDTO = CityDTO;

// ---------- UPDATE ----------
export type UpdateCityDTO = Partial<Omit<CreateCityDTO, "id">> & { id: number };
export type UpdateCityResponseDTO = CreateCityDTO;

// ---------- FIND ----------
export type FindCitiesRawDTO = {
    id?: string;
    description?: string;
    stateId?: string;
    statusId?: string;
    page?: string;
    limit?: string;
};
export type FindCitiesResponseDTO = {
    page?: number;
    limit?: number;
    totalPages?: number;
    data: CityDTO[];
};

// ------ DTO BASE TYPE -------
export type CityDtoBaseType = DtoBaseType<
    CityDTO,
    CreateCityDTO,
    FindCitiesRawDTO,
    UpdateCityDTO,
    CityFilterDTO
>

// ------ BASE REPOSITORY TYPE -------
export type CityBaseRepositoryType = BaseRepositoryType<CityModel, CityEntity, CityFilterDTO, CityPersistenceDTO>;