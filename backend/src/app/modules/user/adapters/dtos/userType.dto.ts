import {BaseRepositoryType, DtoBaseType} from "@coreShared/types/entity.type";
import {UserTypeModel} from "@user/infrastructure/models/userType.model";
import {UserTypeEntity, UserTypeProps} from "@user/domain/entities/userType.entity";
import {AbstractControllerBaseType} from "@coreShared/types/controller.type";

// ---------- BASE ------------
export type UserTypeDTO = UserTypeProps;

// --------- FILTER -----------
export type UserTypeFilterDTO = {
    id?: number | number[],
    description?: string | string[];
    status?: string | string[];
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
export type FindByIdUserTypeResponseDTO = UserTypeDTO;

export type FindUserTypesRawDTO = {
    id?: string;
    description?: string;
    status?: string;
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
export interface UserTypeNormalizedRelations {
    statusId: number;
}

export type UserTypeBaseRepositoryType = BaseRepositoryType<
    UserTypeModel,
    UserTypeEntity,
    UserTypeFilterDTO,
    UserTypePersistenceDTO,
    UserTypeNormalizedRelations
>;

// ------ BASE CONTROLLER TYPE -------
export type UserTypeAbstractControllerBaseType = AbstractControllerBaseType<
    UserTypeDTO,
    CreateUserTypeDTO,
    CreateUserTypeResponseDTO,
    FindByIdUserTypeResponseDTO,
    FindUserTypesRawDTO,
    FindUserTypesResponseDTO,
    UpdateUserTypeDTO,
    UpdateUserTypeResponseDTO
>