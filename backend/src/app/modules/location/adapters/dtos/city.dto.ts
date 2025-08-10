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

export type CityCreateDTO = {
    description: string;
    stateId: number;
}