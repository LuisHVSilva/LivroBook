import api from "./api";
import API_ROUTES from "../config/apiRoutes";

const AccountService = {    
    createAccount: async (userData) => {
        const response = await api.post(API_ROUTES.ACCOUNT.REGISTER, userData);
        return response.data;
    },
};

export default AccountService;
