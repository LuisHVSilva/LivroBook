import {BrowserRouter, Routes} from "react-router-dom";

// Styles
import './app/sass/main.sass'

// Contexts


// Pages
import {PublicPages} from "./app/pages/PublicPages.tsx";
import {ProtectedPages} from "./app/pages/ProtectedPages.tsx";
import {AuthProvider} from "./app/contexts/auth/AuthProvider.tsx";


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

