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
export type CreateUserCredentialRequest = Pick<UserCredentialDTO, "password">;
//#endRegion


export type UserLocalStorageData = Pick<UserDTO, "name" | "email"> & { userType: string; };

export type LoginRequest = {
    email: string;
    password: string;
};

export type LoginResponse = {
    token: string;
    refresh_token: string;
    user: UserLocalStorageData;
}

export type RegisterAuthRequest =
    Pick<UserDTO, "name" | "email" | "birthday">
    & {
    userCredential: CreateUserCredentialRequest
};

export type JwtPayload = {
    userType: string;
};
