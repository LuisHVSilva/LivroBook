export type CityDTO = {
    id?: number;
    description?: string;
    stateId?: number;
    statusId?: number
}

export type CityFilterDTO = {
    id?: number[] | number;
    description?: string[] | string;
    stateId?: number[] | number;
    statusId?: number[] | number;
    page?: number;
    limit?: number;
}

export type CityPersistenceDTO = {
    description: string;
    stateId: number;
    statusId: number;
};

export type CreateCityDTO = {
    description: string;
    stateId: number;
}

export type CreateCityResponseDTO = {
    id: number;
    description: string;
    stateId: number;
    statusId: number
}

export type FindCitiesDTO = {
    id?: string[];
    description?: string[];
    stateId?: string[];
    statusId?: string[];
    page?: string;
    limit?: string;
};

export type FindCitiesResponseDTO = {
    page?: number;
    limit?: number;
    totalPages?: number;
    data: CityDTO[];
};

export type UpdateCityDTO = {
    id: number;
    description?: string;
    stateId?: number;
    statusId?: number;
}