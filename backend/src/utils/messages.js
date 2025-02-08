const MESSAGES = {
    ERRORS: {
        REQUIRED_FIELD: (field) => `${field} é obrigatório.`,
        UNIQUE_FIELD: (field) => `${field} já cadastrado. Favor usar outro.`,
        INVALID_EMAIL: "E-mail inválido.",
        INVALID_TOKEN: "Token inválido.",
        USER_ALREADY_EXISTS: "Usuário já cadastrado. Escolha outro.",
        INVALID_CREDENTIALS: "Credenciais inválidas.",
        UNAUTHORIZED: "Acesso não autorizado.",
        SERVER_ERROR: "Erro interno do servidor.",        
    },
    SUCCESS: {
        USER_CREATED: "Usuário cadastrado com sucesso!",
        LOGIN_SUCCESS: "Login realizado com sucesso!",
        DATA_UPDATED: "Dados atualizados com sucesso!",
        ACCOUNT_VALIDATION: "Conta validada com sucesso",
        ACCOUNT_LOGIN_VALIDATION: "Login validado com sucesso",
    }
};

module.exports = MESSAGES;
