import {DtoBaseType} from "@coreShared/types/entity.type";

export type UserCredentialTypeDTO = {
    id?: number;
    description?: string;
    statusId?: number;
};

export type UserCredentialTypeFilterDTO = {
    id?: number[] | number,
    description?: string[] | string;
    statusId?: number[] | number;
}

export type UserCredentialTypePersistenceDTO = {
    description: string;
    statusId: number
};


export type CreateUserCredentialTypeDTO = {
    description: string;
};


export type CreateUserCredentialTypeResponseDTO = {
    id: number;
    description: string;
    statusId: number
};

export type FindUserCredentialTypesDTO = {
    id?: string[],
    description?: string[];
    statusId?: string[];
    page?: string;
    limit?: string;
};

export type FindUserCredentialTypesResponseDTO = {
    page?: number;
    limit?: number;
    totalPages?: number;
    data: UserCredentialTypeDTO[];
};

export type UpdateUserCredentialTypeDTO = {
    id: number;
    description?: string;
    statusId?: number
};

export type UserCredentialTypeDtoBaseType = DtoBaseType<
    UserCredentialTypeDTO,
    CreateUserCredentialTypeDTO,
    FindUserCredentialTypesDTO,
    UpdateUserCredentialTypeDTO,
    UserCredentialTypeFilterDTO
>