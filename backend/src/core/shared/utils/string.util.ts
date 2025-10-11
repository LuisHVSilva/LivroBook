import {DomainError} from "@coreShared/errors/domain.error";

export type TransformerFn = (value: string) => string;
export type TransformerMap<T> = Partial<Record<keyof T, TransformerFn>>;

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
        parser: (v: string) => T,
        upperCase: boolean = true,
    ): T[] | undefined {
        if (!value) return undefined;
        if (upperCase) {
            return value.split(',').map(v => parser(v.trim().toUpperCase()));
        }
        return value.split(',').map(v => parser(v.trim()));
    }

    static parseBoolean(str: string): boolean {
        return str.trim().toLowerCase() === 'true';
    }

    static parseDate(str: string): Date {
        const d = new Date(str.trim());
        if (isNaN(d.getTime())) {
            throw new Error(`Invalid date: "${str}"`);
        }
        return d;
    }


    static toArray<T>(input: T | T[] | undefined): T[] {
        if (input === undefined) return [];
        return Array.isArray(input) ? input : [input];
    }

    static parseBrazilianDate(dateStr: string): Date {
        const [day, month, year] = dateStr.split('/');
        return new Date(Number(year), Number(month) - 1, Number(day));
    }

    /**
     * Aplica transformações de normalização em campos de um DTO de filtro.
     *
     * @param input - O objeto de entrada (ex: FilterDTO)
     * @param transformers - Mapa de chaves → função transformadora
     * @returns Um novo objeto com os campos transformados
     */
    static applyFilterTransform<T extends Record<string, any>>(
        input: T,
        transformers: TransformerMap<T>
    ): T {
        const transformed = { ...input };

        (Object.keys(transformers) as (keyof T)[]).forEach((key) => {
            const transformFn = transformers[key];
            if (!transformFn) return;

            const value = transformed[key];
            if (!value) return;

            if (Array.isArray(value)) {
                transformed[key] = (value as string[]).map(transformFn) as any;
            } else {
                transformed[key] = [transformFn(value as string)] as any;
            }
        });

        return transformed;
    }


}
