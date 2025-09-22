//#region COUNTRY
export type CountryDTO = {
    id: number;
    description: string;
    statusId: number;
};
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
//#endregion
//#region STATE
export type StateDTO = {
    id: number;
    description: string;
    statusId: number;
    countryId: number;
};
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
//#endregion
//#region CITY
export type CityDTO = {
    id: number;
    description: string;
    stateId: number;
    statusId: number
}
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
//#endregion
