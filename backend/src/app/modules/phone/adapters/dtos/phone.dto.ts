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
    ids: string[];
    numbers: string[];
    phoneCodesIds: string[];
    phoneTypesIds: string[];
    statusesIds: string[];
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
    newNumber?: string;
    newPhoneCodeId?: number;
    newPhoneTypeId?: number;
    newStatusId?: number;
}

export type UpdatePhoneResponseDTO = {
    id: number;
    number: string;
    phoneCodeId: number;
    phoneTypeId: number;
    statusId: number;
}

export type DeletePhoneDTO = {
    ids: string;
}

export type DeletePhoneResponseDTO = {
    report: {
        deleted: number[];
        alreadyInactive: number[];
        notFound: number[];
    };
}
