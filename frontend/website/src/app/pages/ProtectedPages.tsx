import {Route} from "react-router-dom";
import {ProtectedRoute} from "../components/ProtectedRoute";
import MainLayout from "./protected/MainLayout.tsx";
import Index from "./protected/Index.tsx";
import AdminOverview from "./protected/AdminOverview.tsx";


export const ProtectedPages = (
    <Route element={
        <ProtectedRoute><MainLayout/></ProtectedRoute>
    }>
        <Route path="/" element={<Index/>}/>
        <Route path="/admin" element={<AdminOverview/>}></Route>
        {/*<Route path="/profile" element={<Profile />} />*/}
    </Route>
);
