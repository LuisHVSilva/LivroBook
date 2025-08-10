import {DomainError} from "@coreShared/errors/domain.error";

export class StringUtil {
    static transformCapitalLetterWithoutAccent(str: string, validateRequiredString: boolean = false, fieldName?: string): string {
        if (validateRequiredString) {
            if (!fieldName) {
                throw new Error('Para validar se uma string é obrigatória, o nome do campo deve ser fornecido.');
            }
            const error = StringUtil.validateRequiredString(str, fieldName);
            if (error) {
                throw error;
            }
        }

        if (!str) {
            return '';
        }

        return str
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toUpperCase()
            .trim();
    }

    static strToNumber(str: string, errorMessage: string = "Erro de conversão str para int", domainError: boolean = false): number {
        const intString: number = Number(str);

        if (Number.isNaN(intString)) {
            if (domainError) {
                throw new DomainError(errorMessage);
            }
            throw new Error(errorMessage);
        }

        return intString;
    }

    static validateRequiredString(value: string | null | undefined, fieldName: string): Error | null {
        if (value === null || value === undefined || value.trim() === "") {
            return new Error(`The field '${fieldName}' is required and cannot be empty.`);
        }
        return null;
    }

    static parseCsvFilter<T = string>(
        value: string | undefined,
        parser: (v: string) => T
    ): T[] | undefined {
        if (!value) return undefined;
        return value.split(',').map(v => parser(v.trim()));
    }

    // static parseCsvFilter<T = string>(
    //     value: string | undefined,
    //     parser: (v: string) => T
    // ): T[] | undefined {
    //     if (!value) return undefined;
    //     const result = value.split(',').map(v => parser(v.trim()));
    //     if(result.length === 0) return undefined;
    //     return result;
    // }

    static parseBoolean(str: string): boolean {
        return str.trim().toLowerCase() === 'true';
    }

    static toArray<T>(input: T | T[] | undefined): T[] {
        if (input === undefined) return [];
        return Array.isArray(input) ? input : [input];
    }

}
