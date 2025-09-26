import {type ReactNode, useEffect, useState} from "react";
import type {LoginRequest, RegisterAuthRequest, UserLocalStorageData} from "../../../core/api/types/auth.type.ts";
import {authApiService} from "../../../core/api/services/auth.api.service.ts";
import { AuthContext } from "./AuthContext.tsx";


export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<UserLocalStorageData | null>(null);

    useEffect(() => {
        const storedUser = authApiService.getUserInfo();
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    async function login(payload: LoginRequest) {
        await authApiService.login(payload);
        const storedUser: UserLocalStorageData | null = authApiService.getUserInfo();
        if (storedUser) {
            setUser(storedUser);
        }
    }

    async function register(payload: RegisterAuthRequest) {
        await authApiService.register(payload);
    }

    function logout() {
        authApiService.logout();
        setUser(null);
    }

    return (
        <AuthContext.Provider
            value={{
        user,
            isAuthenticated: !!user,
            login,
            register,
            logout,
    }}
>
    {children}
    </AuthContext.Provider>
);
}

