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