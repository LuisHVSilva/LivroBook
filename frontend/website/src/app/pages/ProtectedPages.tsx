import {Route} from "react-router-dom";
import {ProtectedRoute} from "../components/ProtectedRoute";
import MainLayout from "./protected/MainLayout.tsx";
import Index from "./protected/Index.tsx";
import Admin from "./protected/Admin.tsx";


export const ProtectedPages = (
    <Route element={
        <ProtectedRoute><MainLayout/></ProtectedRoute>
    }>
        <Route path="/" element={<Index/>}/>
        <Route path="/admin" element={<Admin/>}></Route>
        {/*<Route path="/profile" element={<Profile />} />*/}
    </Route>
);
