export class UseCaseError extends Error {
    constructor(className:string, message: string) {
        super(message);
        this.name = `UseCase - ${className}`;
        Object.setPrototypeOf(this, UseCaseError.prototype);
    }
}