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

export type PhoneTypePersistenceDTO = {
    description: string;
    statusId: number;
};


export type CreatePhoneTypeDTO = {
    description: string;
    statusId: number;
}

export type CreatePhoneTypeResponseDTO = {
    id: number;
    description: string;
    statusId: number;
}

export type FindPhoneTypesDTO = {
    id?: string[];
    description?: string[];
    statusId?: string[];
    page?: string;
    limit?: string;
};

export type FindPhoneTypesResponseDTO = {
    page?: number;
    limit?: number;
    totalPages?: number;
    data: PhoneTypeDTO[];
}

export type UpdatePhoneTypeDTO = {
    id: number;
    description?: string;
    statusId?: number;
}