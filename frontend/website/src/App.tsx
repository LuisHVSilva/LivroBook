import {BrowserRouter, Routes} from "react-router-dom";

// Styles
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import './app/sass/main.sass'

import {AuthProvider} from "./app/contexts/AuthContext.tsx";
import {PublicPages} from "./app/pages/PublicPages.tsx";
import {ProtectedPages} from "./app/pages/ProtectedPages.tsx";


export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    {PublicPages}
                    {ProtectedPages}
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

