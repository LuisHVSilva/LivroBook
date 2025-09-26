// src/context/AuthContext.tsx
import { createContext } from "react";
import type {LoginRequest, RegisterAuthRequest, UserLocalStorageData} from "../../../core/api/types/auth.type.ts";


type AuthContextType = {
    user: UserLocalStorageData | null;
    isAuthenticated: boolean;
    login: (payload: LoginRequest) => Promise<void>;
    register: (payload: RegisterAuthRequest) => Promise<void>;
    logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
