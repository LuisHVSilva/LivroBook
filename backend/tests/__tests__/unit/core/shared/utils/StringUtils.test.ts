import {StringUtils} from "@coreShared/utils/StringUtils";

describe("StringUtils", () => {

    describe("transformCapitalLetterWithoutAccent", () => {
        it("deve converter a string para maiúsculas e remover acentos", () => {
            expect(StringUtils.transformCapitalLetterWithoutAccent("coração")).toBe("CORACAO");
            expect(StringUtils.transformCapitalLetterWithoutAccent("éxito")).toBe("EXITO");
            expect(StringUtils.transformCapitalLetterWithoutAccent("São Paulo")).toBe("SAO PAULO");
        });

        it("deve manter strings sem acentos inalteradas", () => {
            expect(StringUtils.transformCapitalLetterWithoutAccent("HELLO WORLD")).toBe("HELLO WORLD");
            expect(StringUtils.transformCapitalLetterWithoutAccent("TESTE")).toBe("TESTE");
        });

        it("deve retornar string vazia se entrada for vazia", () => {
            expect(StringUtils.transformCapitalLetterWithoutAccent("")).toBe("");
        });
    });

    describe("strToNumber", () => {
        it("deve converter uma string numérica para número", () => {
            expect(StringUtils.strToNumber("42", "Erro ao converter")).toBe(42);
            expect(StringUtils.strToNumber("0", "Erro ao converter")).toBe(0);
        });

        it("deve lançar erro quando a string não for um número válido", () => {
            expect(() => StringUtils.strToNumber("abc", "Erro ao converter")).toThrow("Erro ao converter");
            expect(() => StringUtils.strToNumber("12abc", "Erro ao converter")).toThrow("Erro ao converter");
            expect(() => StringUtils.strToNumber("", "Erro ao converter")).toThrow("Erro ao converter");
        });
    });
});
