import {dictionary} from "./dictionary.ts";
import {LanguageEnum} from "../enums/language.enum.ts";

export function t(key: string, params?: Record<string, string>, language?: LanguageEnum): string {
    const translations: Record<string, string> = dictionary.getDictionary(language);

    let text: string = translations[key] || key;

    if (params) {
        Object.keys(params).forEach(k => {
            text = text.replace(`{{${k}}}`, params[k]);
        });
    }

    return text;
}
