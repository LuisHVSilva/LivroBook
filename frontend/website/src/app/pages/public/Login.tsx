import {type NavigateFunction, useNavigate} from "react-router-dom";

import {useEffect, useState} from "react";
import {errorMessage} from "../../../core/constants/messages/error.message.ts";
import {Link} from "react-router-dom";
import {authApiService} from "../../../core/api/services/auth.api.service.ts";
import {formUtil} from "../../../core/utils/form.util.ts";

import type {LoginRequest} from "../../../core/api/types/auth.type.ts";
import {t} from "../../../core/constants/messages/translations.ts";
import {useAuth} from "../../../core/hooks/authHook.ts";

const Login = () => {
    const { isAuthenticated } = useAuth();
    const navigate: NavigateFunction = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [password, setPassword] = useState<string>(""); // controla a senha
    const [email, setEmail] = useState<string>("");       // controla o email

    async function handleLogin(formData: FormData): Promise<void> {
        try {
            const data: LoginRequest = {
                email: formUtil.getFormValue(formData, "email"),
                password: formUtil.getFormValue(formData, "password"),
            }

            await authApiService.login(data);
            navigate("/",  { replace: true });

        } catch (e) {
            setError(t(errorMessage.appError.auth.loginError));
            console.error("Erro no login", e);
        }
    }

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/", { replace: true });
        }
    }, [isAuthenticated, navigate]);

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
                        <p>Não tem uma conta? <Link to="/register">Novo usuário</Link></p>
                    </div>

                </section>
            </section>

        </>
    )
}

export default Login;