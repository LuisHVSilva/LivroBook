import {Link, type NavigateFunction, useNavigate} from "react-router-dom";
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
                <div className='nav-items'>
                    {/*<Link to='/' className='nav-item'>LIVROBOOK</Link>*/}
                    <Link to='/' className='nav-item'>RESUMO</Link>
                    <Link to='#' className='nav-item'>ESTANTE</Link>
                    <Link to='/profile' className='nav-item'>PERFIL</Link>
                    {isAdmin && <Link to='/admin' className='nav-item'>ADM</Link>}
                    <Link to='#' className='nav-item' onClick={handleLogout}>SAIR</Link>
                </div>
            </nav>
        </>
    )
}