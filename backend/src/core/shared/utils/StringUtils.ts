export class StringUtils {

    static transformCapitalLetterWithoutAccent(str: string): string {
        return str
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toUpperCase();
    }

    static strToNumber(str: string, errorMessage: string): number {
        const intString: number = Number(str);

        if (Number.isNaN(intString)) {
            throw Error(errorMessage);
        }

        return intString;
    }
}

