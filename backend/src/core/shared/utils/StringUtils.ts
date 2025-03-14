export class StringUtils {

    static transformCapitalLetterWithoutAccent(str: string): string {
        return str
            .normalize('NFD') // Normaliza a string
            .replace(/[\u0300-\u036f]/g, '') // Remove acentos
            .toUpperCase(); // Converte para maiúsculas
    }
}

