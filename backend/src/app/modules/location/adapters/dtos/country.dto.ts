// ---------- BASE ----------
import {BaseRepositoryType, DtoBaseType} from "@coreShared/types/entity.type";
import {CountryModel} from "@location/infrastructure/models/country.model";
import {CountryEntity} from "@location/domain/entities/country.entity";

export type CountryDTO = {
    id?: number;
    description: string;
    statusId: number;
};

// --------- FILTER ---------
export type CountryFilterDTO = {
    id?: number[];
    description?: string[];
    statusId?: number[];
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
export type FindCountriesRawDTO = {
    id?: string;
    description?: string;
    statusId?: string;
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
export type CountryBaseRepositoryType = BaseRepositoryType<CountryModel, CountryEntity, CountryFilterDTO, CountryPersistenceDTO>;