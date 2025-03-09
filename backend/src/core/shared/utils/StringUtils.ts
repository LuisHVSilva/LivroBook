export class StringUtils {

    static transformCapitalLetterWithoutAccent(str: string): string {
        return str
            .normalize('NFD') // Normaliza a string
            .replace(/[\u0300-\u036f]/g, '') // Remove acentos
            .toUpperCase(); // Converte para maiúsculas
    }

    static formatarParaUrl(str: string): string {
        return str
            .toLowerCase()
            .replace(/[^a-z0-9]/g, '-') // Substitui caracteres não alfanuméricos por hífens
            .replace(/-+/g, '-') // Remove múltiplos hífens
            .trim(); // Remove espaços em branco nas extremidades
    }

}

