export const errorMessages = {
    validation: {
        nullFieldRequired: (field: string): string => `Favor informe o valor de ${field}`,
    },
    failure: {
        loginError: 'Usuario ou senha inválido.',
        searchEntity: (entity: string): string => `Erro ao buscar o valor de ${entity}`,
    }
}