export const Messages = {
    Generic: {
        SUCCESS: "Operação realizada com sucesso.",
        INTERNAL_ERROR: "Ocorreu um erro interno no servidor. Por favor, tente novamente mais tarde.",
        MESSAGE_NOT_REGISTERED: "Mensagem não cadastrada.",
    },
    Status: {
        Success: {
            CREATED: (description: string): string => `Status '${description}' criado com sucesso.`,
            UPDATED: "Status atualizado com sucesso.",
            ACTIVATED: "Status ativado com sucesso.",
            DEACTIVATED: "Status desativado com sucesso.",
            FOUND: (description: string): string => `Status '${description}' encontrado com sucesso.`,
        },
        Error: {
            INVALID_DESCRIPTION: "A descrição deve ter pelo menos 3 caracteres.",
            CREATION_FAILED: "Erro ao criar status. Tente novamente mais tarde.",
            DUPLICATE_DESCRIPTION: "Já existe um status com essa descrição.",
            NOT_FOUND: "Status não encontrado.",
        },
    },
    Logger: {
        Info: {
            START_EXECUTION: "Início da execução.",
        },
        Error: {
            DIRECTORY_CREATION_FAILED: "❌ Error creating log directory:",
            LOG_WRITE_FAILED: "❌ Failed to save log",
            ENSURE_LOG_DIRECTORY: "❌ Error ensuring log directory:",

        },
    },
    ErrorHandler: {
        UNEXPECTED_ERROR: "Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.",
    },
} as const;
