import {BaseRepositoryType, DtoBaseType} from "@coreShared/types/entity.type";
import {UserCredentialModel} from "@user/infrastructure/models/userCredential.model";
import {UserCredentialEntity, UserCredentialProps} from "@user/domain/entities/userCredential.entity";
import {AbstractControllerBaseType} from "@coreShared/types/controller.type";


// ---------- BASE ------------
export type UserCredentialDTO = UserCredentialProps;

// --------- FILTER -----------
export type UserCredentialFilterDTO = {
    id?: number | number[],
    userEmail: string | string[],
    password?: string | string[],
    loginAttempts?: number | number[],
    lastLoginIP?: number | number[],
    lastLoginAt?: Date | Date[];
    userCredentialType?: string | string[],
    status?: string | string[],
}

// ------- PERSISTENCE --------
export type UserCredentialPersistenceDTO = Omit<UserCredentialDTO, "id">;

// ---------- CREATE ----------
export type CreateUserCredentialEntityDTO = Pick<UserCredentialDTO, "password" | "userEmail">;
export type CreateUserCredentialResponseDTO = Omit<UserCredentialDTO, "password">;

// ---------- UPDATE ----------
export type UpdateUserCredentialDTO = Partial<Omit<UserCredentialDTO, "id">> & { id: number, newPassword?: string };
export type UpdateUserCredentialResponseDTO = UserCredentialDTO;

// ---------- FIND ------------
export type FindByIdUserCredentialResponseDTO = UserCredentialDTO;
export type FindUserCredentialsRawDTO = {
    id?: string;
    password?: string;
    loginAttempts?: string;
    isTwoFactorEnable?: string;
    isEmailVerified?: string;
    lastLoginIP?: string;
    lastLoginAt?: string;
    userCredentialType?: string;
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
export interface UserCredentialNormalizedRelations {
    userCredentialTypeId: number;
    userId: number;
    statusId: number;
}
export type UserCredentialBaseRepositoryType = BaseRepositoryType<
    UserCredentialModel,
    UserCredentialEntity,
    UserCredentialFilterDTO,
    UserCredentialPersistenceDTO,
    UserCredentialNormalizedRelations
>;

// ------ BASE CONTROLLER TYPE -------
export type PhoneAbstractControllerBaseType = AbstractControllerBaseType<
    UserCredentialDTO,
    CreateUserCredentialEntityDTO,
    CreateUserCredentialResponseDTO,
    FindByIdUserCredentialResponseDTO,
    FindUserCredentialsRawDTO,
    FindUserCredentialsResponseDTO,
    UpdateUserCredentialDTO,
    UpdateUserCredentialResponseDTO
>