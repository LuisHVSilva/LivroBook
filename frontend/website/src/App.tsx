import {BrowserRouter, Route, Routes} from "react-router-dom";

// Styles
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import './app/sass/main.sass'

import Login from "./app/pages/Login";
import RegisterUser from "./app/pages/RegisterUser.tsx";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    {/* Public URLS */}
                    <Route path="/user/login" element={<Login/>}/>
                    <Route path="/user/register" element={<RegisterUser />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
