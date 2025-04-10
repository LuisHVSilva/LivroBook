export const UserTypeMessages = {
    Success: {
        Creation: (description: string): string => `UserType '${description}' criado com sucesso.`,
    },
    Error: {
        Validation: {
            INVALID_DESCRIPTION_NULL: 'A descrição não pode ser nula.',
            INVALID_DESCRIPTION: (len: number): string => `A descrição deve ter pelo menos ${len} caracteres.`,
            STATUS_ASSOCIATE_REQUIRED: 'É necessário um status de associação para criar um UserType.',
            INITIAL_STATUS_ASSOCIATE: (statusDescription: string): string => `O status de criação inicial para um 
            userType deve ser: ${statusDescription}`,
            DUPLICATE_ENTITY: (description: string): string => `O UserType ${description} já está cadastrado`,
        },
        Conflict: {
            CREATE_ENTITY_STATUS_ASSOCIATION: (initUserTypeDescription: string, statusDescription: string): string =>
                `O status inicial deve ser '${initUserTypeDescription}' e não '${statusDescription}'.`,
        },
        NotFound: {
            DESCRIPTION_NOT_FOUND: (description: string): string => `Tipo de usuário '${description}' não encontrado.`,
        },
        Failure: {
            CREATION_FAILED: "Erro ao criar tipo de usuário. Tente novamente mais tarde.",
        }
    }
} as const;
