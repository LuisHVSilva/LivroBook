export type CountryDTO = {
    id?: number;
    description?: string;
    statusId?: number;
};

export type CountryFilterDTO = {
    id?: number[] | number;
    description?: string[] | string;
    statusId?: number[] | number;
}

export type CountryPersistenceDTO = {
    description: string;
    statusId: number;
};


export type CreateCountryDTO = {
    description: string;
}

export type CreateCountryResponseDTO = {
    id: number;
    description: string;
    statusId: number
}

export type FindCountriesDTO = {
    id?: string[];
    description?: string[];
    statusId?: string[];
    page?: string;
    limit?: string;
};

export type FindCountriesResponseDTO = {
    page?: number;
    limit?: number;
    totalPages?: number;
    data: CountryDTO[];
};

export type UpdateCountryDTO = {
    id: number;
    description?: string;
    statusId?: number;
}