import {BaseRepositoryType, DtoBaseType} from "@coreShared/types/entity.type";
import {UserCredentialModel} from "@user/infrastructure/models/userCredential.model";
import {UserCredentialEntity} from "@user/domain/entities/userCredential.entity";


// ---------- BASE ------------
export type UserCredentialDTO = {
    id?: number;
    password?: string;
    loginAttempts: number;
    isTwoFactorEnable: boolean;
    isEmailVerified: boolean;
    lastLoginIP?: string;
    lastLoginAt?: Date;
    userCredentialTypeId: number;
    statusId: number;
};

// --------- FILTER -----------
export type UserCredentialFilterDTO = {
    id?: number[],
    password?: string[];
    loginAttempts?: number[];
    isTwoFactorEnable?: boolean[];
    isEmailVerified?: boolean[];
    lastLoginIP?: string[];
    lastLoginAt?: Date[];
    userCredentialTypeId?: number[];
    statusId?: number[];
}

// ------- PERSISTENCE --------
export type UserCredentialPersistenceDTO = Omit<UserCredentialDTO, "id">;

// ---------- CREATE ----------
export type CreateUserCredentialEntityDTO = Pick<UserCredentialDTO, "password" | "userCredentialTypeId" | "statusId">;
export type CreateUserCredentialResponseDTO = Omit<UserCredentialDTO, "password">;
export type CreateUserCredentialRequestDTO = Pick<UserCredentialDTO, "password">;

// ---------- UPDATE ----------
export type UpdateUserCredentialDTO = Partial<Omit<UserCredentialDTO, "id">> & { id: number, newPassword?: string };
export type UpdateUserCredentialResponseDTO = UserCredentialDTO;

// ---------- FIND ------------
export type FindUserCredentialsRawDTO = {
    id?: string;
    password?: string;
    loginAttempts?: string;
    isTwoFactorEnable?: string;
    isEmailVerified?: string;
    lastLoginIP?: string;
    lastLoginAt?: string;
    userCredentialTypeId?: string;
    page?: string;
    limit?: string;
};
export type FindUserCredentialsResponseDTO = {
    page?: number;
    limit?: number;
    totalPages?: number;
    data: UserCredentialDTO[];
};

// ------ DTO BASE TYPE -------
export type UserCredentialDtoBaseType = DtoBaseType<
    UserCredentialDTO,
    CreateUserCredentialEntityDTO,
    FindUserCredentialsRawDTO,
    UpdateUserCredentialDTO,
    UserCredentialFilterDTO
>

// ------ BASE REPOSITORY TYPE -------
export type UserCredentialBaseRepositoryType = BaseRepositoryType<
    UserCredentialModel,
    UserCredentialEntity,
    UserCredentialFilterDTO,
    UserCredentialPersistenceDTO
>;