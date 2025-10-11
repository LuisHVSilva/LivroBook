import {BaseRepositoryType, DtoBaseType} from "@coreShared/types/entity.type";
import {UserModel} from "@user/infrastructure/models/user.model";
import {UserEntity, UserProps} from "@user/domain/entities/user.entity";
import {CreatePhoneDTO} from "@phone/adapters/dtos/phone.dto";
import {AbstractControllerBaseType} from "@coreShared/types/controller.type";

// ---------- BASE ------------
export type UserDTO = UserProps;

// --------- FILTER -----------
export type UserFilterDTO = {
    id?: number | number[],
    name?: string | string[];
    email?: string | string[];
    document?: string | string[];
    birthday?: Date | Date[];
    isTwoFactorEnable?: boolean | boolean[];
    isEmailVerified?: boolean | boolean[];
    userType?: string | string[];
    city?: string | string[];
    documentType?: string | string[];
    phone?: string | string[];
    status?: string | string[];
}

// ------- PERSISTENCE --------
export type UserPersistenceDTO = Omit<UserDTO, "id">;

// ---------- CREATE ----------
export type CreateUserDTO = Omit<UserDTO, 'isTwoFactorEnable' | 'isEmailVerified' | 'status'>;
export type CreateUserRequestDTO =
    Pick<UserDTO, "name" | "email" | "document" | "birthday" | "city" | "documentType">
    & {
    userCredential: string;
    phone?: CreatePhoneDTO,
};
export type CreateUserResponseDTO = UserDTO;

// ---------- UPDATE ----------
export type UpdateUserDTO = Partial<Omit<UserDTO, "id">> & { id: number };
export type UpdateUserResponseDTO = UserDTO;

// ---------- FIND ------------
export type FindByIdUserResponseDTO = UserDTO;
export type FindUsersRawDTO = {
    id?: string;
    name?: string;
    email?: string;
    document?: string;
    birthday?: string;
    isTwoFactorEnable: string;
    isEmailVerified: string;
    userType?: string;
    city?: string;
    documentType?: string;
    phone?: string;
    status?: string;
    page?: string;
    limit?: string;
};
export type FindUsersResponseDTO = {
    page?: number;
    limit?: number;
    totalPages?: number;
    data: UserDTO[];
};

// ------ DTO BASE TYPE -------
export type UserDtoBaseType = DtoBaseType<
    UserDTO,
    CreateUserDTO,
    FindUsersRawDTO,
    UpdateUserDTO,
    UserFilterDTO
>

// ------ BASE REPOSITORY TYPE -------
export interface UserNormalizedRelations {
    userTypeId: number;
    cityId?: number;
    documentTypeId?: number;
    phoneId?: number;
    statusId: number;
}

export type UserBaseRepositoryType = BaseRepositoryType<
    UserModel,
    UserEntity,
    UserFilterDTO,
    UserPersistenceDTO,
    UserNormalizedRelations
>;

// ------ BASE CONTROLLER TYPE -------
export type UserAbstractControllerBaseType = AbstractControllerBaseType<
    UserDTO,
    CreateUserRequestDTO,
    CreateUserResponseDTO,
    FindByIdUserResponseDTO,
    FindUsersRawDTO,
    FindUsersResponseDTO,
    UpdateUserDTO,
    UpdateUserResponseDTO
>

