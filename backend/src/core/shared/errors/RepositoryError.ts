export class RepositoryError extends Error {
    className: string;
    timestamp: Date;
    code?: string;
    originalError?: Error;

    constructor(className: string, message: string | Error, code?: string) {
        if (message instanceof Error) {
            super(message.message);
            this.originalError = message;
        } else {
            super(message);
        }

        this.name = `RepositoryError - ${className}`;
        this.className = className;
        this.timestamp = new Date();
        this.code = code;

        if (this.originalError?.stack) {
            this.stack = this.originalError.stack;
        }

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, RepositoryError);
        }
    }

    public toJSON(): object {
        return {
            name: this.name,
            message: this.message,
            className: this.className,
            timestamp: this.timestamp.toISOString(),
            code: this.code,
            stack: this.stack,
        };
    }
}
