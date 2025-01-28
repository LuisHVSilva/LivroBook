import React from 'react'

// Components
import Forms from '../../components/Forms'

const UserRegister = () => {

    // Constants
    const formFields = [
        { id: 'name', label: 'Nome', type: 'text' },
        { id: 'email', label: 'E-mail', type: 'email' },
        { id: 'age', label: 'Idade', type: 'number' },
        { id: 'password', label: 'Senha', type: 'password' },
        { id: 'confirmPassword', label: 'Confirmar Senha', type: 'password' },
      ];

    const formButtonTitle = "Enviar";


    return (
        <section id="user-register">
            <Forms                
                fields={formFields}
                buttonTitle={formButtonTitle}
            />
        </section>
    )
}

export default UserRegister