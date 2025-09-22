// import {type NavigateFunction, useNavigate} from "react-router-dom";
import type {PostLoginAuthRequest} from "../../core/api/types/auth.types.ts";

import {useState} from "react";
import {errorMessages} from "../../core/constants/errorMessages.ts";
import {Link} from "react-router-dom";
import {authApiService} from "../../core/api/services/auth.api.service.ts";
import {formUtil} from "../../core/utils/form.util.ts";

const Login = () => {
    // const navigate: NavigateFunction = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [password, setPassword] = useState<string>(""); // controla a senha
    const [email, setEmail] = useState<string>("");       // controla o email

    async function handleLogin(formData: FormData): Promise<void> {
        try {
            const data: PostLoginAuthRequest = {
                email: formUtil.getFormValue(formData, "email"),
                password: formUtil.getFormValue(formData, "password"),
            }

            await authApiService.login(data);
            // navigate("/");

        } catch (e) {
            setError(errorMessages.failure.loginError);
            console.error("Erro no login", e);
        }

    }

    return (
        <>
            <section id="login">
                <section id="login-left">

                </section>
                <section id="login-right">
                    <p className="h1">Login</p>
                    <form id="login-form" action={handleLogin}>
                        <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            autoFocus onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            autoFocus
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="submit" disabled={email.length <= 4 || password.length <= 6}>
                            Entrar
                        </button>
                    </form>

                    {error && <p style={{color: "red"}}>{error}</p>}

                    <div id="login-options">
                        <a href="#">Esqueceu a senha?</a>
                        <p>Não tem uma conta? <Link to="/user/register">Novo usuário</Link></p>
                    </div>

                </section>
            </section>

        </>
    )
}

export default Login;