import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";

import LoginPage from "../pages/User/LoginPage";
import RegisterPage from "../pages/User/RegisterPage";

import NotFound from "../pages/NotFound";

const AppRouter = () => (
    <BrowserRouter>
        <Routes>
            {/* Rotas públicas */}
            <Route element={<PublicRoutes />}>
                <Route path="/" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
            </Route>

            {/* Rotas Privadas */}
            {/* <Route element={<PrivateRoutes />}>
                <Route path="/dashboard" element={<Dashboard />} />
            </Route> */}

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    </BrowserRouter>
);

export default AppRouter;