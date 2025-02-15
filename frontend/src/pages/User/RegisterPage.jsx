import React from 'react'
import Forms from "../../components/Forms";

const RegisterPage = () => {
    const urlPath = 'register';
    const formButtonTitle = "Registrar";
    const formFields = [
        { id: "name", label: "Nome", type: "text" },
        { id: "username", label: "Usuario", type: "text" },
        { id: "email", label: "E-mail", type: "email" },
        { id: "birth_date", label: "Data de nascimento", type: "date" },
        { id: "phone", label: "Telefone", type: "phone" },
        { id: "password", label: "Senha", type: "password" },
        { id: "confirmPassword", label: "Confirmar Senha", type: "password" },
    ];

    return (
        <section id="user-register">
            <Forms urlPath={urlPath} fields={formFields} buttonTitle={formButtonTitle} />

            <div className="links">
                <a href="/">Login</a>
                <a href="#">Recuperar Conta</a>
            </div>
        </section>
    );
}

export default RegisterPage