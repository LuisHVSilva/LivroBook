import axios from "../client/http.ts";
import {authServiceUrl} from "../../constants/url.constant.ts";
import type {LoginRequest, LoginResponse, RegisterAuthRequest, UserLocalStorageData} from "../types/auth.type.ts";
import {NotFoundError, ServiceError} from "../../errors/generic.error.ts";
import {errorMessage} from "../../constants/messages/error.message.ts";
import {t} from "../../constants/messages/translations.ts";


class AuthApiService {

    private readonly TOKEN_KEY: string = "TOKEN";
    private readonly USER: string = "USER";

    async login(payload: LoginRequest): Promise<void> {
        const { data } = await axios.post(authServiceUrl.login, payload);
        if (!data.success) {
            throw new ServiceError(t(errorMessage.appError.auth.loginError));
        }

        const userData: LoginResponse = data.data;

        localStorage.setItem(this.TOKEN_KEY, userData.token);
        localStorage.setItem(this.USER, JSON.stringify(userData.user));
    }

    logout(): void {
        localStorage.removeItem(this.TOKEN_KEY);
        localStorage.removeItem(this.USER);
    }

    async register(payload: RegisterAuthRequest) {
        const { data } = await axios.post(authServiceUrl.register, payload);
        return data;
    }

    getUserInfo(): UserLocalStorageData | null{
        const userData: string | null = localStorage.getItem(this.USER);
        if(userData){
            return JSON.parse(userData);
        }
        return null;
    }

    getTokenKey(): string {
        const token: string | null = localStorage.getItem(this.TOKEN_KEY);
        if (!token) {
            throw new NotFoundError(t(errorMessage.notFoundError.userTokenValue));
        }

        return token;
    }

    findTokenKey(): string | null {
        return localStorage.getItem(this.TOKEN_KEY);
    }

    validatePassword(password: string, confirmPassword: string): boolean {
        return password === confirmPassword;
    }

    clearStorage() {
        localStorage.removeItem(this.USER);
        localStorage.removeItem(this.TOKEN_KEY);
    }
}

export const authApiService = new AuthApiService();
