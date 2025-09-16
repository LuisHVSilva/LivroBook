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
            nullBodyRequest: "A requisição não pode ter corpo vazio.",
            loginAttempts: "Tentativas de login não podem ser negativas.",
            ipAddressInvalid: "Endereço de IP inválido.",
            invalidEmailFormat: "Formato de e-mail inválido.",
            passwordRequired: "A senha não pode ser vazia.",
            oldPasswordRequired: "A senha antiga deve ser informada",
            passwordUpperCase: "A senha deve ter ao menos um caracter maiúsculo.",
            passwordSpecialCharacter: "A senha deve ter ao menos um caracter especial.",
            oldPasswordWrong: "A senha antiga não está correta.",
            oldPasswordNull: "A senha antiga não pode ser vazia.",
            emailFormat: "Formato de email inválido",
            ipInvalid: "IP inválido",
            inactiveEntity: (entity: string): string => `A entidade ${entity.toUpperCase()} não está ativa.`,
            invalidLen: (field: string, minLen: number, maxLen: number): string => `'${field}' deve ter entre ${minLen} e ${maxLen} caracteres.`,
            invalidMinLen: (field: string, min: string) => `O campo '${field}' deve ter pelo menos ${min} caracteres.`,
            invalidMaxLen: (field: string, max: string) => `O campo '${field}' deve ter até ${max} caracteres.`,
            invalidType: (field: string, type: string)=> `O campo '${field}' deve ser do tipo ${type}.`,
        },
    },
    info: {
        alreadyInactive: "As propriedades já foram apagadas."
    }
} as const;
