import {LanguageEnum} from "../../api/enums/language.enum.ts";

class Dictionary {
    public getDictionary(language?: LanguageEnum): Record<string, string> {
        switch (language) {
            case LanguageEnum.ENGLISH:
                return englishDictionary();
            default:
                return portugueseDictionary();
        }

    }
}

//#region portuguese BR
const portugueseDictionary = (): Record<string, string> => {
    return {
        //#region ServiceError
        'serviceError.internalServerError.': 'Erro interno de servidor. Favor tentar novamente.',
        //#endregion

        //#region ConflictError
        'conflictError.generic': "Conflito nos dados",
        //#endregion

        //#region NotFoudError
        'notFoundError.userTokenValue': "Token de usuário não encontrado.",
        'notFoundError.userData': "Dados de usuário não encontrados.",
        //#endregion

        //#region ValidationError
        'validationError.invalidDatas': "Dados inseridos inválidos.",
        //#endregion

        //#region NullFieldError
        "nullFieldError.required": "Favor informe o valor de {{field}}.",
        //#endregion

        //#region AppError
        "appError.auth.loginError": "Usuário ou senha inválido.",
        "appError.auth.sessionExpired": "Sessão expirada, faça login novamente.",
        //#endregion
    }
}
//#endregion

//#english
const englishDictionary = (): Record<string, string> => {
    return {}
}
//#endregion

export const dictionary = new Dictionary();
