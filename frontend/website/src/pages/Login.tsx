import {type NavigateFunction, useNavigate} from "react-router-dom";
import axios from "../services/api.ts";

const Login = () => {
    const navigate: NavigateFunction = useNavigate();


    async function handleLogin(formData: FormData): Promise<void> {
        try {
            const email: string = formData.get("email") as string;
            const password: string = formData.get("password") as string;

            type postLoginRequest = {
                email: string,
                password: string
            }

            const data: postLoginRequest = {
                email: email,
                password: password
            }

            const response = await axios.post("/user/login", data);

            const {token, user} = response.data;


            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            navigate("/");
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
            console.error("Erro no login");
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
                        <input type="text" name="email" placeholder="Email" autoFocus/>
                        <input type="password" name="password" placeholder="Password" autoFocus/>
                        <button type="submit">Entrar</button>
                    </form>

                    <div id="login-options">
                        <a href="#">Esqueceu a senha?</a>
                        <p>Não tem uma conta? <a href="#">Novo usuário</a></p>
                    </div>

                </section>
            </section>

        </>
    )
}

export default Login;