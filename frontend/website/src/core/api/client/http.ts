import axios, {AxiosError} from "axios";
import {ValidationError} from "../../errors/generic.error.ts";

const http = axios.create({
    baseURL: "http://localhost:3000/api",
});

http.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

type responseErrorType = { errors: [], message: string, success: false }

// Interceptor de resposta para erros
http.interceptors.response.use(
    (response) => response, // deixa passar respostas 2xx
    (error: AxiosError) => {
        if (error.response) {
            const status = error.response.status;
            const errorData: responseErrorType = error.response.data as responseErrorType;
            const message = errorData?.message || "Erro inesperado no servidor";
            const errors: [] = errorData.errors;
            if (status === 400) {
                let specificError: string = '';
                if (errors) {
                    for (const error of errors) {
                        specificError += `\n${error}\n`;
                    }

                    return Promise.reject(new ValidationError(specificError));
                }
                return Promise.reject(new ValidationError(message || "Dados inválidos"));
            }

            if (status === 401) {
                // exemplo: token expirado → deslogar usuário
                localStorage.removeItem("token");
                return Promise.reject(new Error("Sessão expirada, faça login novamente"));
            }

            if (status === 403) {
                return Promise.reject(new Error("Você não tem permissão para acessar esse recurso"));
            }

            if (status === 500) {
                return Promise.reject(new Error("Erro interno, tente novamente mais tarde"));
            }
        }

        // Erro de rede ou sem resposta
        return Promise.reject(new Error("Falha de conexão, verifique sua internet"));
    }
);

export default http;
