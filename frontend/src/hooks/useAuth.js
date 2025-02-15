import { useState, useEffect } from "react";
import api from "../services/api";
import API_ROUTES from "../services/apiRoutes";

const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkSession = async () => {
            try {
                const response = await api.get(API_ROUTES.AUTH.CHECK_SESSION);
                setUser(response.data.user);
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkSession();
    }, []);

    const login = async (credentials) => {
        const response = await api.post(API_ROUTES.AUTH.LOGIN, credentials);
        setUser(response.data.user);
        return response;
    };

    const logout = () => {
        setUser(null);
        api.post(API_ROUTES.AUTH.LOGOUT);
    };

    return { user, login, logout, loading };
};

export default useAuth;
