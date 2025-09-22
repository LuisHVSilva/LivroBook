//#region PhoneType
export type PhoneTypeDTO = {
    id: number;
    description: string;
    statusId: number;
};
export type FindPhoneTypesRawDTO = {
    id: string;
    description: string;
    statusId: string;
    page: string;
    limit: string;
};
export type FindPhoneTypesResponseDTO = {
    page?: number;
    limit?: number;
    totalPages?: number;
    data: PhoneTypeDTO[];
}
//#endregion
//#region PhoneCode
export type PhoneCodeDTO = {
    id: number;
    ddiCode: number;
    dddCode: number;
    stateId: number;
    statusId: number;
}

export type FindPhoneCodesRawDTO = {
    id: string;
    ddiCode?: string;
    dddCode?: string;
    stateId?: string;
    statusId?: string;
    page?: string;
    limit?: string;
}
export type FindPhoneCodesResponseDTO = {
    page: number;
    limit: number;
    totalPages: number;
    data: PhoneCodeDTO[];
}
//#endregion
//#region Phone
export type PhoneDTO = {
    id: number;
    number: string;
    phoneCodeId: number;
    phoneTypeId: number;
    statusId: number;
}
export type CreatePhoneDTO = Pick<PhoneDTO, "number" | "phoneCodeId" |"phoneTypeId">;
export type FindPhonesRawDTO = {
    id: string;
    number: string;
    phoneCodeId: string;
    phoneTypeId: string;
    statusId: string;
    page?: string;
    limit?: string;
}
export type FindPhonesResponseDTO = {
    page: number;
    limit: number;
    totalPages: number;
    data: PhoneDTO[];
}
//#endregion