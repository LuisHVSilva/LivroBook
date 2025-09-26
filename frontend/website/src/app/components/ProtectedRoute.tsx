// components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";

import type {JSX} from "react";
import {useAuth} from "../../core/hooks/authHook.ts";


export function ProtectedRoute({ children }: { children: JSX.Element }) {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? children : <Navigate to="/login" replace />;
}
