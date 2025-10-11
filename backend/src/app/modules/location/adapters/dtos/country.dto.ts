// ---------- BASE ----------
import {BaseRepositoryType, DtoBaseType} from "@coreShared/types/entity.type";
import {CountryModel} from "@location/infrastructure/models/country.model";
import {CountryEntity, CountryProps} from "@location/domain/entities/country.entity";
import {AbstractControllerBaseType} from "@coreShared/types/controller.type";

export type CountryDTO = CountryProps;

// --------- FILTER ---------
export type CountryFilterDTO = {
    id?: number | number[];
    description?: string | string[];
    status?: string | string[];
}

// ------- PERSISTENCE ------
export type CountryPersistenceDTO = Omit<CountryDTO, "id">;

// ---------- CREATE ----------
export type CreateCountryDTO = Pick<CountryDTO, "description">;
export type CreateCountryResponseDTO = CountryDTO

// ---------- UPDATE ----------
export type UpdateCountryDTO = Partial<Omit<CountryDTO, "id">> & { id: number };
export type UpdateCountryResponseDTO = CountryDTO;

// ---------- FIND ----------
export type FindByIdCountryResponseDTO = CountryDTO;

export type FindCountriesRawDTO = {
    id?: string;
    description?: string;
    status?: string;
    page?: string;
    limit?: string;
};

export type FindCountriesResponseDTO = {
    page?: number;
    limit?: number;
    totalPages?: number;
    data: CountryDTO[];
};

// ------ DTO BASE TYPE -------
export type CountryDtoBaseType = DtoBaseType<
    CountryDTO,
    CreateCountryDTO,
    FindCountriesRawDTO,
    UpdateCountryDTO,
    CountryFilterDTO
>

// ------ BASE REPOSITORY TYPE -------
export interface CountryNormalizedRelations {
    statusId: number;
}
export type CountryBaseRepositoryType = BaseRepositoryType<
    CountryModel,
    CountryEntity,
    CountryFilterDTO,
    CountryPersistenceDTO,
    CountryNormalizedRelations
>;

// ------ BASE CONTROLLER TYPE -------
export type CountryAbstractControllerBaseType = AbstractControllerBaseType<
    CountryProps,
    CreateCountryDTO,
    CreateCountryResponseDTO,
    FindByIdCountryResponseDTO,
    FindCountriesRawDTO,
    FindCountriesResponseDTO,
    UpdateCountryDTO,
    UpdateCountryResponseDTO
>