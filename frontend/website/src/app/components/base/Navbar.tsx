import {NavLink, type NavigateFunction, useNavigate} from "react-router-dom";
import {useAuth} from "../../../core/hooks/authHook.ts";


export const Navbar = () => {
    const {isAdmin, logout} = useAuth();
    const navigate: NavigateFunction = useNavigate();

    function handleLogout(): void {
        logout();
        navigate('/')
    }

    return (
        <>
            <nav id="navbar">
                <div className="nav-items">
                    <div id="nav-logo" className="nav-item">
                        <a href="/" className="nav-link inactive">
                            LivroBook
                        </a>
                    </div>

                    <div id="nav-navigations" className="nav-item">
                        <NavLink
                            to="/"
                            className={({isActive}) => "nav-link" + (isActive ? " active" : "")}
                        >
                            <i className="fa-solid fa-house"></i>
                        </NavLink>

                        <NavLink
                            to="/estante"
                            className={({isActive}) => "nav-link" + (isActive ? " active" : "")}
                        >
                            <i className="fa-solid fa-book-bookmark"></i>
                        </NavLink>

                        {isAdmin && (
                            <NavLink
                                to="/admin"
                                className={({isActive}) => "nav-link" + (isActive ? " active" : "")}
                            >
                                <i className="fa-regular fa-chart-bar"></i>
                            </NavLink>
                        )}

                    </div>

                    <div id="nav-account" className="nav-item">
                        <NavLink to="/profile"
                                 className={({isActive}) => "nav-link" + (isActive ? " active" : "")}
                        >
                            <i className="fa-regular fa-user"></i>
                        </NavLink>
                        <NavLink to="/" onClick={handleLogout}
                        >
                            <i className="fa-solid fa-arrow-right-from-bracket"></i>
                        </NavLink>
                    </div>
                </div>
            </nav>
        </>
    );

}