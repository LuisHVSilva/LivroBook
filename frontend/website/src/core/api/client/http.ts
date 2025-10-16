import axios, {AxiosError, type AxiosInstance} from "axios";
import {AppError} from "../../errors/generic.error.ts";
import {authApiService} from "../services/auth/auth.api.service.ts";
import type {ResponseErrorType} from "../types/http.type.ts";
import {handleHttpResponse} from "./handleHttpResponse.ts";
import {errorMessage} from "../../constants/messages/error.message.ts";
//TODO -> Not finding env file
// const {VITE_API_URL} = import.meta.env ?? 'http://localhost:3000/api';

const http: AxiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {"Content-Type": "application/json"},
    timeout: 10000,
});

http.interceptors.request.use((config) => {
    const token: string | null = authApiService.findTokenKey();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});


http.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.response) {
            const status = error.response.status;
            const data = error.response.data as ResponseErrorType;

            // 🔹 Centraliza o tratamento
            const appError = handleHttpResponse.mapHttpError(status, data);

            if (status === 401) {
                authApiService.clearStorage();
            }

            return Promise.reject(appError);
        }

        return Promise.reject(new AppError(errorMessage.serviceError.internalServerError));
    }
);

export default http;
