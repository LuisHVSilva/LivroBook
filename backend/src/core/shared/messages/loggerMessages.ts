export const LoggerMessages = {
    Info: {
        START_EXECUTION: "Início da execução.",
        EXECUTION_SUCCESS: "Execução bem sucedida",
        RECEIVE_REQUEST: (input: string): string => `Recebendo request - input: ${input}`,
    },
    Error: {
        DIRECTORY_CREATION_FAILED: "❌ Erro ao criar diretório de logs.",
        LOG_WRITE_FAILED: "❌ Falha ao salvar log.",
        ENSURE_LOG_DIRECTORY: "❌ Error ensuring log directory:",
    }
} as const;
