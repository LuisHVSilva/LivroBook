export class ResultType<T, E extends Error = Error> {
    private readonly value?: T;
    private readonly error?: E;
    private readonly kind: "success" | "failure" | "none";

    private constructor(kind: "success" | "failure" | "none", value?: T, error?: E) {
        this.kind = kind;
        this.value = value;
        this.error = error;
    }

    /**
     * Creates a successful result with the provided value.
     * @param value
     */
    static success<T, E extends Error = Error>(value: T): ResultType<T, E> {
        return new ResultType<T, E>("success", value);
    }

    /**
     * Creates a failure result with the provided error.
     * @param error
     */
    static failure<T, E extends Error = Error>(error: E): ResultType<T, E> {
        return new ResultType<T, E>("failure", undefined, error);
    }

    /**
     * Creates a result representing a "none" value.
     */
    static none<T, E extends Error = Error>(): ResultType<T, E> {
        return new ResultType<T, E>("none");
    }

    /**
     * Checks if the result is successful.
     */
    isSuccess(): boolean {
        return this.kind === "success";
    }

    /**
     * Checks if the result is a failure.
     */
    isFailure(): boolean {
        return this.kind === "failure";
    }

    /**
     * Checks if the result represents a "none" value.
     */
    isNone(): boolean {
        return this.kind === "none";
    }

    /**
     * Unwraps the value, throwing an error if the result is a failure or none.
     * @param restorer Optional function to restore the value.
     */
    unwrapOrThrow<U = T>(restorer?: (value: unknown) => U): U {
        if (this.isFailure()) {
            if (this.error instanceof Error) throw this.error;
            throw new Error(`Failure: ${String(this.error)}`);
        }
        if (this.isNone()) {
            throw new Error("None value");
        }
        const val = this.value as unknown;
        return restorer ? restorer(val) : (val as U);
    }

    /**
     * Unwraps the value, returning null if the result is none, or throwing an error if it is a failure.
     * @param restorer Optional function to restore the value.
     */
    unwrapOrNull<U = T>(restorer?: (value: unknown) => U): U | null {
        if (this.isFailure()) {
            if (this.error instanceof Error) throw this.error;
            throw new Error(`Failure: ${String(this.error)}`);
        }
        if (this.isNone()) {
            return null;
        }
        const val = this.value as unknown;
        return restorer ? restorer(val) : (val as U);
    }

    /**
     * Unwraps the value
     * @param restore Optional function to restore the value.
     */
    unwrap<U = T>(restore?: (value: unknown) => U): U {
        const val = this.value as unknown;
        return restore ? restore(val) : (val as U)
    }

    /**
     * Unwraps the value, returning a default value if the result is none or a failure.
     * @param defaultValue The default value to return if the result is none or failure.
     * @param restorer Optional function to restore the value.
     */
    unwrapOrDefault(defaultValue: T, restorer?: (value: unknown) => T): T {
        if (this.isSuccess()) {
            const val = this.value as unknown;
            return restorer ? restorer(val) : (val as T);
        }
        return defaultValue;
    }

    /**
     * Gets the error if the result is a failure, throwing an error if it is not.
     */
    getError(): E {
        if (!this.isFailure()) {
            throw new Error("Cannot get error when result is not failure");
        }
        return this.error as E;
    }

    /**
     * Maps the value of the result to a new value using the provided function.
     * If the result is a failure or none, it returns a new result with the same error or none state.
     * @param fn The function to map the value.
     */
    map<U>(fn: (value: T) => U): ResultType<U, E> {
        if (this.isSuccess()) {
            return ResultType.success(fn(this.value as T));
        }
        if (this.isFailure()) {
            return ResultType.failure<U, E>(this.error as E);
        }
        return ResultType.none<U, E>();
    }

    /**
     * Maps the error of the result to a new error using the provided function.
     * If the result is a success, it returns a new success result with the same value.
     * If the result is none, it returns a none result.
     * @param fn The function to map the error.
     */
    mapError<F extends Error>(fn: (error: E) => F): ResultType<T, F> {
        if (this.isFailure()) {
            return ResultType.failure<T, F>(fn(this.error as E));
        }
        if (this.isSuccess()) {
            return ResultType.success(this.value as T);
        }
        return ResultType.none<T, F>();
    }

    /**
     * Maps the value of the result or restores it using the provided restorer function if the value is not of the expected class.
     * @param restorer
     * @param expectedClass
     */
    public mapValueOrRestore<U>(
        restorer: (value: any) => U,
        expectedClass: new (...args: any[]) => U
    ): ResultType<U, E> {
        if (this.isSuccess()) {
            const value = this.value;
            if (value instanceof expectedClass) {
                return ResultType.success<U, E>(value);
            }
            return ResultType.success<U, E>(restorer(value));
        }
        if (this.isFailure()) {
            return ResultType.failure<U, E>(this.error as E);
        }
        return ResultType.none<U, E>();
    }

}
