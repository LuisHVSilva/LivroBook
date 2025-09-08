import {DtoBaseType} from "@coreShared/types/entity.type";

export type UserTypeDTO = {
    id?: number;
    description?: string;
    statusId?: number;
};

export type UserTypeFilterDTO = {
    id?: number[] | number,
    description?: string[] | string;
    statusId?: number[] | number;
}

export type UserTypePersistenceDTO = {
    description: string;
    statusId: number;
};

export type CreateUserTypeDTO = {
    description: string;
};

export type CreateUserTypeResponseDTO = {
    id: number;
    description: string;
    statusId: number;
};

export type FindUserTypesDTO = {
    id?: string;
    description?: string;
    statusId?: string;
    page?: string;
    limit?: string;
};

export type FindUserTypesResponseDTO = {
    page?: number;
    limit?: number;
    totalPages?: number;
    data: UserTypeDTO[];
};

export type UpdateUserTypeDTO = {
    id: number;
    description?: string;
    statusId?: number;
};

export type UserTypeDtoBaseType = DtoBaseType<
    UserTypeDTO,
    CreateUserTypeDTO,
    FindUserTypesDTO,
    UpdateUserTypeDTO,
    UserTypeFilterDTO
>
