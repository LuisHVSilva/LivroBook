import type {
    JwtPayload,
    LoginRequest,
    LoginResponse,
    RegisterAuthRequest,
    UserLocalStorageData
} from "../../models/types/auth.type.ts";
import axios from "../../api/http.ts";
import {authUrl} from "../../api/endpoints.api.ts";
import {ServiceError} from "../../errors/generic.error.ts";
import {t} from "../../models/messages/translations.ts";
import {errorMessage} from "../../models/messages/error.message.ts";
import {jwtDecode} from "jwt-decode";


class AuthApiService {

    private readonly TOKEN_KEY: string = "TOKEN";
    private readonly USER: string = "USER";

    async login(payload: LoginRequest): Promise<LoginResponse> {
        const {data} = await axios.post(authUrl.login, payload);
        if (!data.success) {
            throw new ServiceError(t(errorMessage.appError.auth.loginError));
        }

        const userData: LoginResponse = data.result;
        const userSafeData = {name: userData.user.name, email: userData.user.email}

        localStorage.setItem(this.TOKEN_KEY, userData.token);
        localStorage.setItem(this.USER, JSON.stringify(userSafeData));

        return userData;
    }

    logout(): void {
        localStorage.removeItem(this.TOKEN_KEY);
        localStorage.removeItem(this.USER);
    }

    async register(payload: RegisterAuthRequest) {
        const {data} = await axios.post(authUrl.register, payload);
        return data;
    }

    getUserInfo(): UserLocalStorageData | null {
        const userData: string | null = localStorage.getItem(this.USER);
        if (userData) {
            return JSON.parse(userData);
        }
        return null;
    }

    getTokenKey(): string | null{
        return localStorage.getItem(this.TOKEN_KEY);
    }

    getUserTypeFromToken(): string | null {
        try {
            const token: string | null = this.getTokenKey();
            if (!token) {
                return null;
            }

            const decoded: JwtPayload = jwtDecode<JwtPayload>(token);
            return decoded.userType;
        } catch {
            return null;
        }
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
