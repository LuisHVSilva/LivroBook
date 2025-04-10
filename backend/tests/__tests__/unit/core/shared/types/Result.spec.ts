import {Result} from "@coreShared/types/Result";

// Mock da mensagem usada em getError
jest.mock("@coreShared/messages/sharedMessages", () => ({
    SharedMessages: {
        Result: {
            ERROR_GET_VALUE: "Erro ao tentar acessar o erro em um resultado bem-sucedido.",
        },
    },
}));

describe("Result", () => {
    const successResult = Result.success("ok");
    const error = new Error("Falha");
    const failureResult = Result.failure(error);
    const noneResult = Result.none();

    describe("kind states", () => {
        it("should return correct kind states", () => {
            expect(successResult.isSuccess()).toBe(true);
            expect(successResult.isFailure()).toBe(false);
            expect(successResult.isNone()).toBe(false);

            expect(failureResult.isSuccess()).toBe(false);
            expect(failureResult.isFailure()).toBe(true);
            expect(failureResult.isNone()).toBe(false);

            expect(noneResult.isSuccess()).toBe(false);
            expect(noneResult.isFailure()).toBe(false);
            expect(noneResult.isNone()).toBe(true);
        });
    })

    describe("unrappOrThrow", () => {
        it("should unwrap success result", () => {
            expect(successResult.unwrapOrThrow()).toBe("ok");
        });

        it("should throw on unwrap failure result", () => {
            expect(() => failureResult.unwrapOrThrow()).toThrowError("Operação falhou: Error: Falha");
        });

        it("should throw on unwrap none result", () => {
            expect(() => noneResult.unwrapOrThrow()).toThrowError("Nenhum valor foi encontrado.");
        });
    })

    describe("getError", () => {
        it("should return error on failure result", () => {
            expect(failureResult.getError()).toBe(error);
        });

        it("should throw on getError when result is not failure", () => {
            expect(() => successResult.getError()).toThrowError("Erro ao tentar acessar o erro em um resultado bem-sucedido.");
            expect(() => noneResult.getError()).toThrowError("Erro ao tentar acessar o erro em um resultado bem-sucedido.");
        });
    })

    describe("map", () => {
        it("should map success result", () => {
            const mapped = successResult.map((v) => v + "!");
            expect(mapped.isSuccess()).toBe(true);
            expect(mapped.unwrapOrThrow()).toBe("ok!");
        });

        it("should map failure result and propagate error", () => {
            const mapped = failureResult.map((v) => v + "!");
            expect(mapped.isFailure()).toBe(true);
            expect(mapped.getError()).toBe(error);
        });

        it("should map none result and remain none", () => {
            const mapped = noneResult.map((v) => v);
            expect(mapped.isNone()).toBe(true);
        })
    })

    describe("fromObject", () => {
        it('should return a Result.success when kind is "success"', () => {
            const obj = { kind: 'success', value: 42 };
            const result = Result.fromObject<number>(obj);

            expect(result.isSuccess()).toBe(true);
            expect(result.unwrapOrThrow()).toBe(42);
        });

        it('should return a Result.failure when kind is "failure"', () => {
            const obj = { kind: 'failure', error: 'Erro genérico' };
            const result = Result.fromObject<number, string>(obj);

            expect(result.isFailure()).toBe(true);
            expect(() => result.unwrapOrThrow()).toThrow('Operação falhou: Erro genérico');
        });

        it('should return a Result.none when kind is "none"', () => {
            const obj = { kind: 'none' };
            const result = Result.fromObject<number>(obj);

            expect(result.isNone()).toBe(true);
            expect(() => result.unwrapOrThrow()).toThrow('Nenhum valor foi encontrado.');
        });

        it('should throw error if "kind" is not known', () => {
            const obj = { kind: 'unknown', value: 123 };

            expect(() => Result.fromObject<number>(obj)).toThrow('Unknown Result kind: unknown');
        });

        it('should throw error if obj is invalid (undefined)', () => {
            expect(() => Result.fromObject<number>(undefined)).toThrow('Invalid object for Result');
        });

        it('should throw error if obj does not have "kind"', () => {
            const obj = { value: 123 };

            expect(() => Result.fromObject<number>(obj)).toThrow('Invalid object for Result');
        });
    })
})
