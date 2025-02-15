import { useState, useMemo } from "react";
import Forms from "../components/Forms";

const User = ({ urlPath: initialUrlPath }) => {
    const [urlPath, setUrlPath] = useState(initialUrlPath)

    const { formButtonTitle, formFields } = useMemo(() => {
        if (urlPath === "register") {
            return {
                formButtonTitle: "Registrar",
                formFields: [
                    { id: "name", label: "Nome", type: "text" },
                    { id: "username", label: "Usuario", type: "text" },
                    { id: "email", label: "E-mail", type: "email" },
                    { id: "birth_date", label: "Data de nascimento", type: "date" },
                    { id: "phone", label: "Telefone", type: "phone" },
                    { id: "password", label: "Senha", type: "password" },
                    { id: "confirmPassword", label: "Confirmar Senha", type: "password" },
                ],
            };
        }

        return {
            formButtonTitle: "Entrar",
            formFields: [
                { id: "username", label: "Usuário", type: "text" },
                { id: "password", label: "Senha", type: "password" },
            ],
        };
    }, [urlPath]);

    const linkOnClick = (e, newUrlPath) => {
        e.preventDefault();
        setUrlPath(newUrlPath);
    }

    return (
        <section id="user-register">
            <Forms urlPath={urlPath} fields={formFields} buttonTitle={formButtonTitle} />

            <div className="links">
                <a href="#" onClick={(e) => { linkOnClick(e, 'register') }}>Registrar</a>
                <a href="#">Recuperar Conta</a>
            </div>
        </section>
    );
};

export default User;
