import {BrowserRouter, Route, Routes} from "react-router-dom";

// Styles
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import './sass/main.sass'

import Login from "./pages/Login";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    {/* Public URLS */}
                    <Route path="/user/login" element={<Login/>}/>

                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
