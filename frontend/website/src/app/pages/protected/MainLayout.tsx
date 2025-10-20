import {Outlet} from "react-router-dom";
import {Navbar} from "../../components/base/Navbar.tsx";

export default function MainLayout() {
    return (
        <>
            <section id='main-layout'>
                <header>
                    <Navbar/>
                </header>

                <main id="main-content">
                    <Outlet/>
                </main>
            </section>
        </>
    );
}
