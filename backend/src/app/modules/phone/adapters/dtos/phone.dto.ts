export type PhoneDTO = {
    id?: number;
    number?: string;
    phoneCodeId?: number;
    phoneTypeId?: number;
    statusId?: number;
}

export type PhoneFilterDTO = {
    id?: number[] | number;
    number?: string | string[];
    phoneCodeId?: number[] | number;
    phoneTypeId?: number[] | number;
    statusId?: number[] | number;
    page?: number;
    limit?: number;
}

export type PhonePersistenceDTO = {
    number: string;
    phoneCodeId: number;
    phoneTypeId: number;
    statusId: number;
};

export type CreatePhoneDTO = {
    number: string;
    phoneCodeId: number;
    phoneTypeId: number;
}

export type CreatePhoneResponseDTO = {
    id: number;
    number: string;
    phoneCodeId: number;
    phoneTypeId: number;
    statusId: number;
}

export type FindPhonesDTO = {
    id: string[];
    number: string[];
    phoneCodeId: string[];
    phoneTypeId: string[];
    statusId: string[];
    page?: string;
    limit?: string;
}

export type FindPhonesResponseDTO = {
    page: number;
    limit: number;
    totalPages: number;
    data: PhoneDTO[];
}

export type UpdatePhoneDTO = {
    id: number;
    number?: string;
    phoneCodeId?: number;
    phoneTypeId?: number;
    statusId?: number;
}
