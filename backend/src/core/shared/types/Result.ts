import {SharedMessages} from "@coreShared/messages/sharedMessages";
export class Result<T, E = Error> {
    public readonly isSuccess: boolean;
    public readonly error?: E;
    public readonly value?: T;

    private constructor(
        isSuccess: boolean,
        value?: T,
        error?: E
    ) {
        this.isSuccess = isSuccess;
        this.value = value;
        this.error = error;
    }

    public static success<T, E = Error>(value: T): Result<T, E> {
        return new Result<T, E>(true, value);
    }

    public static failure<T, E = Error>(error: E): Result<T, E> {
        return new Result<T, E>(false, undefined, error);
    }

    public isSuccessful(): boolean {
        return this.isSuccess;
    }

    public isFailure(): boolean {
        return !this.isSuccess;
    }

    public getValue(): T {
        if (!this.isSuccess) {
            throw this.error!;
        }
        return this.value!;
    }

    public getError(): E {
        if (this.isSuccess) {
            throw new Error(SharedMessages.Result.ERROR_GET_VALUE);
        }
        return this.error!;
    }

    public unwrap(): T {
        if (this.isFailure()) {
            throw this.error!
        }
        return this.value!;
    }
}
