import {StringUtils} from "@coreShared/utils/StringUtils";

describe("StringUtils", () => {

    describe("transformCapitalLetterWithoutAccent", () => {
        it("should convert the string to uppercase and remove accents", () => {
            expect(StringUtils.transformCapitalLetterWithoutAccent("coração")).toBe("CORACAO");
            expect(StringUtils.transformCapitalLetterWithoutAccent("éxito")).toBe("EXITO");
            expect(StringUtils.transformCapitalLetterWithoutAccent("São Paulo")).toBe("SAO PAULO");
        });

        it("should keep unaccented strings unchanged", () => {
            expect(StringUtils.transformCapitalLetterWithoutAccent("HELLO WORLD")).toBe("HELLO WORLD");
            expect(StringUtils.transformCapitalLetterWithoutAccent("TESTE")).toBe("TESTE");
        });

        it("should return empty string if input is empty", () => {
            expect(StringUtils.transformCapitalLetterWithoutAccent("")).toBe("");
        });
    });

    describe("strToNumber", () => {
        it("should convert a numeric string to number", () => {
            expect(StringUtils.strToNumber("42", "Erro ao converter")).toBe(42);
            expect(StringUtils.strToNumber("0", "Erro ao converter")).toBe(0);
        });

        it("should throw error when string is not a valid number", () => {
            expect(() => StringUtils.strToNumber("abc", "Erro ao converter")).toThrow("Erro ao converter");
            expect(() => StringUtils.strToNumber("12abc", "Erro ao converter")).toThrow("Erro ao converter");
        });
    });
});
