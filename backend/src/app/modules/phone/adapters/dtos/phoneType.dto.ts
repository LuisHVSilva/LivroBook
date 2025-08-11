export type PhoneTypeDTO = {
    id?: number;
    description?: string;
    statusId?: number;
};

export type PhoneTypeFilterDTO = {
    id?: number[] | number;
    description?: string[] | string;
    statusId?: number[] | number;
    page?: number;
    limit?: number;
}

export type CreatePhoneTypeDTO = {
    description: string;
    statusId: number;
}

export type CreatePhoneTypeResponseDTO = {
    id: number;
    description: string;
    statusId: number;
}