export type PhoneCodeDTO = {
    id?: number;
    ddiCode?: number;
    dddCode?: number;
    stateId?: number;
    statusId?: number;
}

export type PhoneCodeFilterDTO = {
    id?: number[] | number;
    ddiCode?: number[] | number;
    dddCode?: number[] | number;
    stateId?: number[] | number;
    statusId?: number[] | number;
    page?: number;
    limit?: number;
}

export type CreatePhoneCodeDTO = {
    ddiCode: number;
    dddCode: number;
    stateId: number;
}

export type CreatePhoneCodeResponseDTO = {
    id: number;
    ddiCode: number;
    dddCode: number;
    stateId: number;
    statusId: number;
}

export type FindPhoneCodesDTO = {
    id?: string[];
    ddiCode?: string[];
    dddCode?: string[];
    stateId?: string[];
    statusId?: string[];
    page?: string;
    limit?: string;
}

export type FindPhoneCodesResponseDTO = {
    page: number;
    limit: number;
    totalPages: number;
    data: PhoneCodeDTO[];
}

export type UpdatePhoneCodeDTO = {
    id: number;
    ddiCode?: number;
    dddCode?: number;
    stateId?: number;
    statusId?: number;
}
