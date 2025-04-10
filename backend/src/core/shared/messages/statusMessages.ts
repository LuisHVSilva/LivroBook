export const StatusMessages = {
    Success: {
        Creation: (description: string): string => `Status '${description}' criado com sucesso.`,
        Retrieval: {
            FOUND: (description: string): string => `Status '${description}' encontrado com sucesso.`,
            FOUND_BY_ID: "Status encontrado com sucesso.",
        },
        Update: (oldData: string, newData: string): string =>
            `Status '${oldData}' atualizado com sucesso para '${newData}'.`,
        Activation: {
            ACTIVATED: "Status ativado com sucesso.",
            DEACTIVATED: "Status desativado com sucesso.",
        },
    },
    Error: {
        Retrieval: {
            ID_NOT_FOUND: (id: number): string => `Status '${id.toString()}' não encontrado.`,
        },
        NotFound: {
            DESCRIPTION_NOT_FOUND: (description: string): string => `Status '${description}' não encontrado.`,
        },
        Validation: {
            INVALID_DESCRIPTION_LEN: "A descrição deve ter pelo menos 3 caracteres.",
            INVALID_ENUM: "State inválido para o Status.",
            PENDING_APPROVAL_STATUS_NOT_FOUND: "O status 'PENDENTE DE APROVAÇÃO' não foi encontrado.",
            PENDING_APPROVAL_STATUS_INACTIVE: "O status 'PENDENTE DE APROVAÇÃO' está inativo.",
            DUPLICATE_DESCRIPTION: "Já existe um status com essa descrição.",
            STATUS_NOT_FOUND: "Status não encontrado.",
            ID_TYPE: "ID deve ser do tipo número",
        },
        Conflict: {
            DUPLICATE_DESCRIPTION: "Já existe um status com essa descrição.",
        },
        Failure: {
            CREATION_FAILED: "Erro ao criar status. Tente novamente mais tarde.",
            UPDATED_FAILED: "Erro ao atualizar status.",
            GET_BY_ID: "Status não encontrado."
        }
    }
} as const;
