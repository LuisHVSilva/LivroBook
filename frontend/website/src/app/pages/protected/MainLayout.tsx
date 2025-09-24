// layouts/MainLayout.tsx

import {Outlet} from "react-router-dom";
import {Navbar} from "../../components/base/Navbar.tsx";

export default function MainLayout() {
    return (
        <>
            <section id='main-layout'>
                <header>
                    <Navbar/>
                </header>

                <div className="content-wrapper">
                    <main>
                        <Outlet/> {/* Aqui vai renderizar a página específica */}
                    </main>
                </div>
            </section>
        </>
    );
}
