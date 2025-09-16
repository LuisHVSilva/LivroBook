import {BaseRepositoryType, DtoBaseType} from "@coreShared/types/entity.type";
import {UserModel} from "@user/infrastructure/models/user.model";
import {UserEntity} from "@user/domain/entities/user.entity";
import {CreateUserCredentialRequestDTO} from "@user/adapters/dtos/userCredential.dto";
import {CreatePhoneDTO} from "@phone/adapters/dtos/phone.dto";

// ---------- BASE ------------
export type UserDTO = {
    id?: number;
    name: string;
    email: string;
    document: string;
    birthday: Date;
    userTypeId: number;
    cityId: number;
    userCredentialId: number;
    documentTypeId: number;
    phoneId?: number;
    statusId: number;
};

// --------- FILTER -----------
export type UserFilterDTO = {
    id?: number[],
    name?: string[];
    email?: string[];
    document?: string[];
    birthday?: Date[];
    userTypeId?: number[];
    cityId?: number[];
    userCredentialId?: number[];
    documentTypeId?: number[];
    phoneId?: number[];
    statusId?: number[];
}

// ------- PERSISTENCE --------
export type UserPersistenceDTO = Omit<UserDTO, "id">;

// ---------- CREATE ----------
export type CreateUserDTO = Pick<UserDTO, "name" | "email" | "document" | "birthday" | "userTypeId" | "cityId" | "userCredentialId" | "documentTypeId" | "phoneId">;
export type CreateUserRequestDTO = Pick<UserDTO, "name" | "email" | "document" | "birthday" | "cityId" | "documentTypeId"> & {
    userCredential: CreateUserCredentialRequestDTO,
    phone?: CreatePhoneDTO,
};
export type CreateUserResponseDTO = UserDTO;

// ---------- UPDATE ----------
export type UpdateUserDTO = Partial<Omit<UserDTO, "id">> & { id: number };
export type UpdateUserResponseDTO = UserDTO;

// ---------- FIND ------------
export type FindUsersRawDTO = {
    id?: string;
    name?: string;
    email?: string;
    document?: string;
    birthday?: string;
    userTypeId?: string;
    cityId?: string;
    userCredentialId?: string;
    documentTypeId?: string;
    phoneId?: string;
    statusId?: string;
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
export type UserBaseRepositoryType = BaseRepositoryType<
    UserModel,
    UserEntity,
    UserFilterDTO,
    UserPersistenceDTO
>;