import {UserDTO} from "@user/adapters/dtos/user.dto";

// ---------- LOGIN -----------
export type LoginDTO = {
    email: string;
    password: string;
};

export type LoginResponseDTO = {
    token: string,
    user: Pick<UserDTO, "email" | "userTypeId">
}

export type CreateTokenPayloadDTO = {
    userId: number;
    email: string
}