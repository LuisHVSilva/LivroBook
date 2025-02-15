import Forms from "../../components/Forms";

const LoginPage = () => {
    const urlPath = 'login'
    const formButtonTitle = "Entrar";
    const formFields = [
        { id: "username", label: "Usuário", type: "text" },
        { id: "password", label: "Senha", type: "password" },
    ];

    return (
        <section id="user-register">
            <Forms urlPath={urlPath} fields={formFields} buttonTitle={formButtonTitle} />

            <div className="links">
                <a href="/register">Registrar</a>
                <a href="#">Recuperar Conta</a>
            </div>
        </section>
    );
};

export default LoginPage;
