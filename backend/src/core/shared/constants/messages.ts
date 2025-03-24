export const Messages = {
    Generic: {
        SUCCESS: "Operação realizada com sucesso.",
        INTERNAL_ERROR: "Ocorreu um erro interno no servidor. Por favor, tente novamente mais tarde.",
        MESSAGE_NOT_REGISTERED: "Mensagem não cadastrada.",
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
    Result: {
        Error: {
            GET_VALUE: "Cannot get value from a failed result.",
            GET_ERROR: "Cannot get error from a successful result.",
        }
    },
    Status: {
        Success: {
            CREATED: (description: string): string => `Status '${description}' criado com sucesso.`,
            FOUND: (description: string): string => `Status '${description}' encontrado com sucesso.`,
            UPDATED_TO: (oldDescription: string, newDescription: string): string => `Status ${oldDescription} atualizado com sucesso para ${newDescription}.`,
            FOUND_BY_ID: "status encontrado com sucesso.",
            ACTIVATED: "status ativado com sucesso.",
            DEACTIVATED: "status desativado com sucesso.",
        },
        Error: {
            INVALID_ID: (id: string): string => `Status '${id}' não encontrado.`,
            DESCRIPTION_NOT_FOUND: (description: string): string => `Status '${description}' não encontrado.`,
            INVALID_DESCRIPTION: "A descrição deve ter pelo menos 3 caracteres.",
            INVALID_ENUM: "State inválido para o Status",
            CREATION_FAILED: "Erro ao criar status. Tente novamente mais tarde.",
            DUPLICATE_DESCRIPTION: "Já existe um status com essa descrição.",
            NOT_FOUND: "status não encontrado.",
            UPDATED_FAILED: "Erro ao atualizar status."
        },
    },
} as const;
