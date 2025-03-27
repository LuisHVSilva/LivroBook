export const SharedMessages = {
    Result: {
        ERROR_GET_VALUE: "Não é possível obter valor de um resultado falho.",
        ERROR_GET_ERROR: "Não é possível obter erro de um resultado bem-sucedido.",
    },
    Controller: {
        REQUEST_RECEIVED: (data: string): string => `Recebendo request - input: ${data}`,
    }
} as const;
