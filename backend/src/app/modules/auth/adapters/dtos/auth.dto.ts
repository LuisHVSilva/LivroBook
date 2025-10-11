import {UserDTO} from "@user/adapters/dtos/user.dto";

// ---------- LOGIN -----------
export type LoginDTO = {
    email: string;
    password: string;
    ip: string;
};

export type LoginResponseDTO = {
    token: string,
    user: Pick<UserDTO, "name" | "email" | "userType">;
}

export type CreateTokenPayloadDTO = {
    userId: number;
    email: string
    userType: string;
}

export type DecodedTokenPayloadDTO = CreateTokenPayloadDTO & {iat: number, exp: number};