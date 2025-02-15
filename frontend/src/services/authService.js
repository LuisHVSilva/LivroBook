import api from "./api";
import API_ROUTES from "../config/apiRoutes";

const AuthService = {
    login: async (credentials) => {
        const response = await api.post(API_ROUTES.AUTH.LOGIN, credentials);
        localStorage.setItem("token", response.data.token); // Armazena token
        
        return response.data;
    },

    logout: () => {
        localStorage.removeItem("token");
    },

    isAuthenticated: () => {
        return !!localStorage.getItem("token");
    },
};

export default AuthService;
