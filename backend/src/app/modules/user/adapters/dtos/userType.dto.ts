import {BaseRepositoryType, DtoBaseType} from "@coreShared/types/entity.type";
import {UserTypeModel} from "@user/infrastructure/models/userType.model";
import {UserTypeEntity} from "@user/domain/entities/userType.entity";

// ---------- BASE ------------
export type UserTypeDTO = {
    id?: number;
    description: string;
    statusId: number;
};

// --------- FILTER -----------
export type UserTypeFilterDTO = {
    id?: number[],
    description?: string[];
    statusId?: number[];
}

// ------- PERSISTENCE --------
export type UserTypePersistenceDTO = Omit<UserTypeDTO, "id">;

// ---------- CREATE ----------
export type CreateUserTypeDTO = Pick<UserTypeDTO, "description">;
export type CreateUserTypeResponseDTO = UserTypeDTO;

// ---------- UPDATE ----------
export type UpdateUserTypeDTO = Partial<Omit<UserTypeDTO, "id">> & { id: number };
export type UpdateUserTypeResponseDTO = UserTypeDTO;

// ---------- FIND ------------
export type FindUserTypesRawDTO = {
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

// ------ DTO BASE TYPE -------
export type UserTypeDtoBaseType = DtoBaseType<
    UserTypeDTO,
    CreateUserTypeDTO,
    FindUserTypesRawDTO,
    UpdateUserTypeDTO,
    UserTypeFilterDTO
>

// ------ BASE REPOSITORY TYPE -------
export type UserTypeBaseRepositoryType = BaseRepositoryType<
    UserTypeModel,
    UserTypeEntity,
    UserTypeFilterDTO,
    UserTypePersistenceDTO
>;