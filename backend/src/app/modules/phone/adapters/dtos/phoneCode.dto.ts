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
    ids?: string[];
    ddiCodes?: string[];
    dddCodes?: string[];
    statesIds?: string[];
    statusesIds?: string[];
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
    newDdiCode?: number;
    newDddCode?: number;
    newStateId?: number;
    newStatusId?: number;
}

export type UpdatePhoneCodeResponseDTO = {
    id: number;
    ddiCode: number;
    dddCode: number;
    stateId: number;
    statusId: number;
}

export type DeletePhoneCodesDTO = {
    ids: string;
}

export type DeletePhoneCodesResponseDTO = {
    message: string;
}
