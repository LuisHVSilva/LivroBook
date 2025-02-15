import { Navigate, Outlet } from "react-router-dom";

const PublicRoutes = () => {
    const isAuthenticated = !!localStorage.getItem("token");

    return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

export default PublicRoutes;
