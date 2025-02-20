import { StatusCodes } from 'http-status-codes';

export interface ILogger {
    /**
     * Registra uma mensagem de erro.
     * 
     * @param method - Nome do método ou contexto onde o erro ocorreu.
     * @param httpStatus - Código de status HTTP (pode ser nulo se não aplicável).
     * @param error - Objeto de erro capturado.
     */
    logError(method: string, httpStatus: StatusCodes | null, error: Error): void;

    /**
     * Registra uma mensagem de aviso.
     * 
     * @param method - Nome do método ou contexto onde o aviso foi gerado.
     * @param httpStatus - Código de status HTTP associado ao aviso.
     * @param message - Mensagem de aviso (pode ser nula se não aplicável).
     */
    logWarn(method: string, httpStatus: StatusCodes, message: string | null): void;

    /**
     * Registra uma mensagem de sucesso.
     * 
     * @param method - Nome do método ou contexto onde a operação foi bem-sucedida.
     * @param httpStatus - Código de status HTTP associado ao sucesso.
     * @param message - Mensagem de sucesso (pode ser nula se não aplicável).
     */
    logSuccess(method: string, httpStatus: StatusCodes, message: string | null): void;

    /**
     * Registra uma mensagem de sucesso.
     * 
     * @param method - Nome do método ou contexto onde a operação foi bem-sucedida.
     * @param className - Nome da classe que está associado o log, se aplicável.
     * @param message - Mensagem de sucesso (pode ser nula se não aplicável).
     */
    logInfo(method: string, className: string | null, message: string): void;
}
