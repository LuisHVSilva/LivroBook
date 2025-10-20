import {type ReactNode, useEffect, useState} from "react";
import type {
    LoginRequest,
    LoginResponse, RegisterAuthRequest,
    UserLocalStorageData
} from "../../../core/models/types/auth.type.ts";

import {AuthContext} from "./AuthContext.tsx";
import {authApiService} from "../../../core/entities/auth/auth.api.service.ts";

const ADMINISTRATOR: string = "ADMINISTRATOR";

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<UserLocalStorageData | null>(null);

    useEffect(() => {
        const storedUser = authApiService.getUserInfo();
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    async function login(payload: LoginRequest) {
        const userResponse: LoginResponse = await authApiService.login(payload);
        const storedUser: UserLocalStorageData | null = authApiService.getUserInfo();

        if (storedUser) {
            setUser(userResponse.user);
        }
    }

    async function register(payload: RegisterAuthRequest) {
        await authApiService.register(payload);
    }

    function logout() {
        authApiService.logout();
        setUser(null);
    }

    const isAuthenticated = !!user;
    const isAdmin: boolean = authApiService.getUserTypeFromToken() === ADMINISTRATOR;

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                isAdmin,
                login,
                register,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

