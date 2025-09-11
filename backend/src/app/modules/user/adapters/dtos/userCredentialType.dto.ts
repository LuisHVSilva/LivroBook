import {BaseRepositoryType, DtoBaseType} from "@coreShared/types/entity.type";
import {UserCredentialTypeModel} from "@user/infrastructure/models/userCredentialType.model";
import {UserCredentialTypeEntity} from "@user/domain/entities/userCredentialType.entity";

// ---------- BASE ------------
export type UserCredentialTypeDTO = {
    id?: number;
    description: string;
    statusId: number;
};

// --------- FILTER -----------
export type UserCredentialTypeFilterDTO = {
    id?: number[],
    description?: string[];
    statusId?: number[];
}

// ------- PERSISTENCE --------
export type UserCredentialTypePersistenceDTO = Omit<UserCredentialTypeDTO, "id">;

// ---------- CREATE ----------
export type CreateUserCredentialTypeDTO = Pick<UserCredentialTypeDTO, "description">;
export type CreateUserCredentialTypeResponseDTO = UserCredentialTypeDTO;

// ---------- UPDATE ----------
export type UpdateUserCredentialTypeDTO = Partial<Omit<UserCredentialTypeDTO, "id">> & { id: number };
export type UpdateUserCredentialTypeResponseDTO = UserCredentialTypeDTO;

// ---------- FIND ------------
export type FindUserCredentialTypesRawDTO = {
    id?: string,
    description?: string;
    statusId?: string;
    page?: string;
    limit?: string;
};
export type FindUserCredentialTypesResponseDTO = {
    page?: number;
    limit?: number;
    totalPages?: number;
    data: UserCredentialTypeDTO[];
};

// ------ DTO BASE TYPE -------
export type UserCredentialTypeDtoBaseType = DtoBaseType<
    UserCredentialTypeDTO,
    CreateUserCredentialTypeDTO,
    FindUserCredentialTypesRawDTO,
    UpdateUserCredentialTypeDTO,
    UserCredentialTypeFilterDTO
>

// ------ BASE REPOSITORY TYPE -------
export type UserCredentialTypeBaseRepositoryType = BaseRepositoryType<
    UserCredentialTypeModel,
    UserCredentialTypeEntity,
    UserCredentialTypeFilterDTO,
    UserCredentialTypePersistenceDTO
>;