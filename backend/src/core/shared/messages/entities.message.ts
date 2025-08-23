export const EntitiesMessage = {
    success: {
        delete: (entity: string) => `${entity.toUpperCase()} excluído com sucesso`,
    },
    error: {
        conflict: {
            duplicateValue: (entity: string, field: string) =>
                `Campo ${field.toUpperCase()} de ${entity.toUpperCase()} já cadastrado.`,
            duplicateValueGeneric: "Já existe esse conjunto de dados salvos.",
        },
        failure: {
            delete: (entity: string) => `Erro ao apagar ${entity.toUpperCase()}.`,
            update: (entity: string) => `Erro ao atualizar ${entity.toUpperCase()}.`,
        },
        retrieval: {
            notFound: (entity: string) => `Nenhum valor encontrado para ${entity.toUpperCase()}.`,
            notFoundById: (id: string) => `Valor de id não encontrado: ${id.toString()}`,
            notFoundForeignKey: (entity: string, id: number) => `Id ${id.toString()} não encontrado para ${entity.toUpperCase()}.`,
            notFoundGeneric: "Nenhum valor encontrado para os parâmetros passados.",
            inactiveStatus: 'Status está inativo. Favor entrar em contato com o administrador do sistema'
        },
        validation: {
            descriptionRequired: "Descrição é obrigatória.",
            idRequired: "Pelo menos um id é obrigatório.",
            idType: "ID deve ser do tipo número.",
            numberType: "Must contain only numbers",
            nullInput: "Informe ao menos uma propriedade.",
            numberPositive: "O campo deve ser do tipo inteiro positivo.",
            boolType: "O campo deve ser do tipo true ou false.",
            transactionRequired: "Transação é obrigatória.",
            nullBodyRequest: "A requisição não pode ter corpo vazio",
            invalidLen: (field: string, minLen: number, maxLen: number): string => `'${field}' deve ter entre ${minLen} e ${maxLen} caracteres.`,
            invalidMinDescriptionLen: (len: number) => `A descrição deve ter pelo menos ${len} caracteres.`,
            invalidMaxDescriptionLen: (len: number) => `A descrição deve ter até ${len} caracteres.`,
            invalidMinLen: (field: string, min: string) => `O campo '${field}' deve ter pelo menos ${min} caracteres.`,
            invalidMaxLen: (field: string, max: string) => `O campo '${field}' deve ter até ${max} caracteres.`,
            invalidType: (field: string, type: string)=> `O campo '${field}' deve ser do tipo ${type}.`,
            nullFieldRequired: (field: string) => `O campo '${field}' é obrigatório`,
        },
    },
    info: {
        alreadyInactive: "As propriedades já foram apagadas."
    }
} as const;
