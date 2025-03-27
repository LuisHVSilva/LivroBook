export const StatusMessages = {
    Success: {
        Creation: (description: string): string => `Status '${description}' criado com sucesso.`,
        Retrieval: {
            FOUND: (description: string): string => `Status '${description}' encontrado com sucesso.`,
            FOUND_BY_ID: "Status encontrado com sucesso.",
        },
        Update: (oldDescription: string, newDescription: string): string =>
            `Status '${oldDescription}' atualizado com sucesso para '${newDescription}'.`,
        Activation: {
            ACTIVATED: "Status ativado com sucesso.",
            DEACTIVATED: "Status desativado com sucesso.",
        },
    },
    Error: {
        NotFound: {
            INVALID_ID: (id: string): string => `Status '${id}' não encontrado.`,
            DESCRIPTION_NOT_FOUND: (description: string): string => `Status '${description}' não encontrado.`,
        },
        Validation: {
            INVALID_DESCRIPTION_LEN: "A descrição deve ter pelo menos 3 caracteres.",
            INVALID_ENUM: "State inválido para o Status.",
            PENDING_APPROVAL_STATUS: "O status 'PENDENTE DE APROVAÇÃO' não foi encontrado.",
            DUPLICATE_DESCRIPTION: "Já existe um status com essa descrição.",
        },
        Conflict: {
            DUPLICATE_DESCRIPTION: "Já existe um status com essa descrição.",
        },
        Failure: {
            CREATION_FAILED: "Erro ao criar status. Tente novamente mais tarde.",
            UPDATED_FAILED: "Erro ao atualizar status.",
        }
    }
} as const;
