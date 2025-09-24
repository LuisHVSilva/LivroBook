// src/context/AuthContext.tsx
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type {PostLoginAuthRequest, RegisterUserAuthRequest} from "../../core/api/types/auth.types.ts";
import {authApiService} from "../../core/api/services/auth.api.service.ts";

type User = {
    id: string;
    name: string;
    email: string;
} | null;

type AuthContextType = {
    user: User;
    isAuthenticated: boolean;
    login: (payload: PostLoginAuthRequest) => Promise<void>;
    register: (payload: RegisterUserAuthRequest) => Promise<void>;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User>(null);

    // Restaurar user do localStorage quando app inicia
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    async function login(payload: PostLoginAuthRequest) {
        await authApiService.login(payload);
        const storedUser = authApiService.getUserFromStorage();
        setUser(storedUser);
    }

    async function register(payload: RegisterUserAuthRequest) {
        await authApiService.register(payload);
        // depende: pode já logar direto ou só retornar
    }

    function logout() {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
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

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth deve ser usado dentro de AuthProvider");
    return context;
}
