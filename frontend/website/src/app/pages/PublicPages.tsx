import { Route } from "react-router-dom";
import Login from "./public/Login.tsx";
import RegisterUser from "./public/RegisterUser.tsx";

export const PublicPages = (
    <>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterUser />} />
    </>
);
