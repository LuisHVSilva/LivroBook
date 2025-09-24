// components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import {useAuth} from "../contexts/AuthContext.tsx";
import type {JSX} from "react";


export function ProtectedRoute({ children }: { children: JSX.Element }) {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? children : <Navigate to="/login" replace />;
}
