// ---------- BASE ----------
import {BaseRepositoryType, DtoBaseType} from "@coreShared/types/entity.type";
import {CityModel} from "@location/infrastructure/models/city.model";
import {CityEntity, CityProps} from "@location/domain/entities/city.entity";
import {AbstractControllerBaseType} from "@coreShared/types/controller.type";

export type CityDTO = CityProps;

// --------- FILTER ---------
export type CityFilterDTO = {
    id?: number | number[];
    description?: string | string[];
    state?: string | string[];
    status?: string | string[];
}

// ------- PERSISTENCE ------
export type CityPersistenceDTO = Omit<CityDTO, "id">;

// ---------- CREATE ----------
export type CreateCityDTO = Pick<CityDTO, "description" | "state">;
export type CreateCityResponseDTO = CityDTO;

// ---------- UPDATE ----------
export type UpdateCityDTO = Partial<Omit<CreateCityDTO, "id">> & { id: number };
export type UpdateCityResponseDTO = CreateCityDTO;

// ---------- FIND ----------
export type FindByIdCityResponseDto = CityDTO;

export type FindCitiesRawDTO = {
    id?: string;
    description?: string;
    state?: string;
    status?: string;
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
export interface CityNormalizedRelations {
    stateId: number;
    statusId: number;
}
export type CityBaseRepositoryType = BaseRepositoryType<
    CityModel,
    CityEntity,
    CityFilterDTO,
    CityPersistenceDTO,
    CityNormalizedRelations
>;

// ------ BASE CONTROLLER TYPE -------
export type CityAbstractControllerBaseType = AbstractControllerBaseType<
    CityProps,
    CreateCityDTO,
    CreateCityResponseDTO,
    FindByIdCityResponseDto,
    FindCitiesRawDTO,
    FindCitiesResponseDTO,
    UpdateCityDTO,
    UpdateCityResponseDTO
>