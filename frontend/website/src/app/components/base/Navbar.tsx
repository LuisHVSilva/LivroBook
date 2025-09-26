import {Link} from "react-router-dom";
import {useAuth} from "../../../core/hooks/authHook.ts";


export const Navbar = () => {
    const { isAuthenticated } = useAuth();

    return (
        <>
            <nav id="navbar">
                <div className='nav-items'>
                    <Link to='/' className='nav-item'>LIVROBOOK</Link>
                    <Link to='#' className='nav-item'>Resumo</Link>
                    <Link to='#' className='nav-item'>Estante</Link>
                    <Link to='/profile' className='nav-item'>Perfil</Link>
                    {isAuthenticated && <Link to='/adm' className='nav-item'>ADM</Link>}
                    <Link to='#' className='nav-item'>Sair</Link>
                </div>
            </nav>
        </>
    )
}