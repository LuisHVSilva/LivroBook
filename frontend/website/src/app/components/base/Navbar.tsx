import {Link} from "react-router-dom";

export const Navbar = () => {
    return (
        <>
            <nav id="navbar">
                <div className='nav-items'>
                    <Link to='/' className='nav-item'>LIVROBOOK</Link>
                    <Link to='#' className='nav-item'>Resumo</Link>
                    <Link to='#' className='nav-item'>Estante</Link>
                    <Link to='/profile' className='nav-item'>Perfil</Link>
                    <Link to='#' className='nav-item'>Sair</Link>
                </div>
            </nav>
        </>
    )
}