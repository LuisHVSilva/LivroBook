const API_BASE_URL = import.meta.env.VITE_API_URL;

const API_ROUTES = {
    AUTH: {
        LOGIN: `${API_BASE_URL}/account/login`,        
    },
    ACCOUNT: {
        REGISTER: `${API_BASE_URL}/account/register`,
    }
};

export default API_ROUTES;
