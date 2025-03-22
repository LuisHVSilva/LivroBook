import {Result} from "@coreShared/types/Result";
import { Messages } from "@coreShared/constants/messages";

describe("Result", () => {
    it("deve criar um resultado de sucesso com um valor", () => {
        const result = Result.success("Sucesso!");

        expect(result.isSuccess).toBe(true);
        expect(result.isFailure()).toBe(false);
        expect(result.getValue()).toBe("Sucesso!");
        expect(() => result.getError()).toThrow(Messages.Result.Error.GET_ERROR);
    });

    it("deve criar um resultado de falha com uma mensagem de erro", () => {
        const result = Result.failure("Erro ocorrido");

        expect(result.isSuccess).toBe(false);
        expect(result.isFailure()).toBe(true);
        expect(result.getError()).toBe("Erro ocorrido");
        expect(() => result.getValue()).toThrow(Messages.Result.Error.GET_VALUE);
    });

    it("deve retornar corretamente se é sucesso ou falha", () => {
        const successResult = Result.success(100);
        const failureResult = Result.failure("Falhou");

        expect(successResult.isSuccessful()).toBe(true);
        expect(successResult.isFailure()).toBe(false);

        expect(failureResult.isSuccessful()).toBe(false);
        expect(failureResult.isFailure()).toBe(true);
    });

    it("deve lançar erro ao tentar acessar getValue() de um resultado de falha", () => {
        const failureResult = Result.failure("Erro!");

        expect(() => failureResult.getValue()).toThrow(Messages.Result.Error.GET_VALUE);
    });

    it("deve lançar erro ao tentar acessar getError() de um resultado de sucesso", () => {
        const successResult = Result.success("OK!");

        expect(() => successResult.getError()).toThrow(Messages.Result.Error.GET_ERROR);
    });
});
