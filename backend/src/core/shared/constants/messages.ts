export const Messages = {
    Generic: {
        Success: "Sucesso",
        Error: "Internal Server error",
        MessageNotRegistered: "Mensagem não cadastrada",
    },
    Status: {
        Success: {
            CREATED_SUCCESS: (description: string): string => `Status ${description} criado com sucesso.`,
            UPDATED_SUCCESS: "Status atualizado com sucesso.",
            ACTIVATED_SUCCESS: "Status ativado com sucesso.",
            DEACTIVATED_SUCCESS: "Status desativado com sucesso."
        },
        Error: {
            INVALID_DESCRIPTION: "A descrição deve ter mais de 3 caracteres.",
            CREATED_FAILED: "Erro ao criar status. Tente novamente mais tarde.",
            DESCRIPTION_DUPLICATED: "Já existe um status com essa descrição."
        },
    },
    Logger: {
        Error: {
            PATH_NOT_CREATED: "Erro ao criar diretório de logs",
            NOT_REGISTER: "Erro ao registrar no arquivo de log",
        }
    },
    ErrorHandler: {
        handleError: "Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.",
    }
} as const;
