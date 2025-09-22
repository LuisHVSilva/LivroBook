import axios from "../client/http.ts";
import type {PostLoginAuthRequest, RegisterUserAuthRequest} from "../types/auth.types.ts";
import {authServiceUrl} from "../../constants/url.constant.ts";


export class AuthApiService {
    async login(payload: PostLoginAuthRequest): Promise<void> {
        const { data } = await axios.post(authServiceUrl.login, payload);
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("user", JSON.stringify(data.data.user));
        console.log(data)
    }

    async register(payload: RegisterUserAuthRequest) {

        const { data } = await axios.post(authServiceUrl.register, payload);
        return data;
    }

    getUserFromStorage() {
        return JSON.parse(localStorage.getItem("user") || "{}");
    }

    validatePassword(password: string, confirmPassword: string): boolean {
        return password === confirmPassword;
    }

}

export const authApiService = new AuthApiService();
