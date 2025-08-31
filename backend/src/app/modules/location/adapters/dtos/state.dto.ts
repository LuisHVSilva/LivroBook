export type StateDTO = {
    id?: number;
    description?: string;
    statusId?: number;
    countryId?: number;
};

export type StateFilterDTO = {
    id?: number[] | number;
    description?: string[] | string;
    countryId?: number[] | number;
    statusId?: number[] | number;
}

export type StatePersistenceDTO = {
    description: string;
    statusId: number;
    countryId: number;
};

export type CreateStateDTO = {
    description: string;
    countryId: number;
}

export type CreateStateResponseDTO = {
    id: number;
    description: string;
    countryId: number;
    statusId: number
}

export type FindStatesDTO = {
    id?: string[];
    description?: string[];
    countryId?: string[];
    statusId?: string[];
    page?: string;
    limit?: string;
};

export type FindStatesResponseDTO = {
    page?: number;
    limit?: number;
    totalPages?: number;
    data: StateDTO[];
};

export type UpdateStateDTO = {
    id: number;
    description?: string;
    countryId?: number;
    statusId?: number;
}