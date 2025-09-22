//#region USER

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
//#endregion

//#region UserCredential
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
export type CreateUserCredentialRequestDTO = Pick<UserCredentialDTO, "password">;
//#endRegion

export type PostLoginAuthRequest = {
    email: string;
    password: string;
};

export type PostLoginAuthResponse = {
    access_token: string;
    refresh_token: string;
    user: {
        email: string;
        userTypeId: number;
    }
}

export type RegisterUserAuthRequest =
    Pick<UserDTO, "name" | "email" | "birthday">
    & {
    userCredential: CreateUserCredentialRequestDTO
};
export type CreateUserResponseDTO = UserDTO;

