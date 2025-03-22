export class ValidateError extends Error {
    constructor(className:string, message: string) {
        super(message);
        this.name = `Validate - ${className}`;
    }
}