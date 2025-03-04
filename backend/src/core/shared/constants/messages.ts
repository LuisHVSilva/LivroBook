export const Messages = {
    Status: {
        Success: {
            CREATED_SUCCESS: "Status criado com sucesso.",
            UPDATED_SUCCESS: "Status atualizado com sucesso.",
            ACTIVATED_SUCCESS: "Status ativado com sucesso.",
            DEACTIVATED_SUCCESS: "Status desativado com sucesso."
        },
        Error: {
            INVALID_DESCRIPTION: "A descrição deve ter mais de 3 caracteres.",
            CREATED_FAILED: "Erro ao criar status. Tente novamente mais tarde.",
            NOT_FOUND: (id: string): string => `Status com ID ${id} não encontrado`,
        },
    },
} as const;
