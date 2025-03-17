import {Messages} from "@coreShared/constants/messages";

export class Result<T> {
    public readonly isSuccess: boolean;
    public readonly error?: string;
    public readonly value?: T;

    private constructor(isSuccess: boolean, value?: T, error?: string) {
        this.isSuccess = isSuccess;
        this.value = value;
        this.error = error;
    }

    public static success<T>(value: T): Result<T> {
        return new Result<T>(true, value);
    }

    public static failure<T>(error: string): Result<T> {
        return new Result<T>(false, undefined, error);
    }

    public isSuccessful(): boolean {
        return this.isSuccess;
    }

    public isFailure(): boolean {
        return !this.isSuccess;
    }

    public getValue(): T {
        if (!this.isSuccess) {
            throw new Error(Messages.Result.Error.GET_VALUE);
        }
        return this.value!;
    }

    public getError(): string {
        if (this.isSuccess) {
            throw new Error(Messages.Result.Error.GET_ERROR);
        }
        return this.error!;
    }
}
