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

export type StateCreateDTO = {
    description: string;
    countryId: number;
}