export class RepositoryError extends Error {
    className: string;
    timestamp: Date;

    constructor(className: string, message: string) {
        super(message);
        this.name = `RepositoryError - ${className}`;
        this.className = className;
        this.timestamp = new Date();

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, RepositoryError);
        }
    }
}
