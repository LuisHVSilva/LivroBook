import { SharedMessages } from "@coreShared/messages/sharedMessages";

export class Result<T, E = Error> {
    private readonly value?: T;
    private readonly error?: E;
    private readonly kind: "success" | "failure" | "none";

    private constructor(kind: "success" | "failure" | "none", value?: T, error?: E) {
        this.kind = kind;
        this.value = value;
        this.error = error;
    }

    public static success<T, E = Error>(value: T): Result<T, E> {
        return new Result<T, E>("success", value);
    }

    public static failure<T, E = Error>(error: E): Result<T, E> {
        return new Result<T, E>("failure", undefined, error);
    }

    public static none<T, E = Error>(): Result<T, E> {
        return new Result<T, E>("none");
    }

    public isSuccess(): boolean {
        return this.kind === "success";
    }

    public isFailure(): boolean {
        return this.kind === "failure";
    }

    public isNone(): boolean {
        return this.kind === "none";
    }

    public unwrapOrThrow(restorer?: (value: any) => T): T {
        if (this.isFailure()) {
            throw new Error(`Operação falhou: ${(this.error as E)}`);
        }
        if (this.isNone()) {
            throw new Error("Nenhum valor foi encontrado.");
        }

        const value = this.value as T;

        return restorer ? restorer(value) : value;
    }


    public getError(): E {
        if (!this.isFailure()) {
            throw new Error(SharedMessages.Result.ERROR_GET_VALUE);
        }
        return this.error as E;
    }

    public map<U>(fn: (value: T) => U): Result<U, E> {
        if (this.isSuccess()) {
            return Result.success(fn(this.value as T));
        }
        if (this.isFailure()) {
            return Result.failure<U, E>(this.error as E);
        }
        return Result.none<U, E>();
    }

    public static fromObject<T, E = Error>(obj: any): Result<T, E> {
        if (!obj || typeof obj !== 'object' || !('kind' in obj)) {
            throw new Error('Invalid object for Result');
        }

        switch (obj.kind) {
            case 'success':
                return Result.success<T, E>(obj.value);
            case 'failure':
                return Result.failure<T, E>(obj.error);
            case 'none':
                return Result.none<T, E>();
            default:
                throw new Error(`Unknown Result kind: ${obj.kind}`);
        }
    }
}
