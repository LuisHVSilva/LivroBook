import { IStatusEntity } from "../app/interface/Entities/IStatusEntity";

export const MESSAGES = {
    ERRORS: {
        STATUS_REPOSITORY: {
            CREATE: 'Erro ao criar status.',
            GET: 'Erro ao buscar status.',
            GET_BY_ID: 'Erro ao buscar status por id.',
            GET_BY_ID_NOT_FOUND: 'Status nao encontrado pelo id.',
            GET_ALL_STATUS: 'Erro ao buscar todos os status.',
            DELETE: 'Erro ao deletar status.',
            DELETE_BY_ID_NOT_FOUND: 'Status nao encontrado para deletar.'
        },
        STATUS_SERVICE: {
            CREATE_STATUS_NULL_FIELD: 'Sem dados para criar o status. Favor informar o corpo da requisição.\n Campo de descrição obrigatório',
            CREATE_STATUS: 'Erro ao criar status.'
        },
        STATUS_CONTROLLER: {
            NECESSARY_FIELD: (field: string) => `Favor informar os campos: ${field}.`,
            CREATE_STATUS_GENERIC_ERROR: 'Não foi possível criar o status',
            GET_STATUS_GENERIC_ERROR: (id: string) => `Não foi possível buscar o status de id ${id}`,
        },
        GENERIC_MESSAGE: 'Houve um erro inesperado.'
    },
    SUCCESS: {
        STATUS_SERVICE: {
            CREATE: (field: IStatusEntity) => `${field} criado com sucesso.`,
            GET_BY_ID: (data: IStatusEntity) => `Objeto encontrado com sucess: ${data}`,
            DELETE: (id: number): string => `Status deletado com sucesso: ${id}`,
        }
    }
};
