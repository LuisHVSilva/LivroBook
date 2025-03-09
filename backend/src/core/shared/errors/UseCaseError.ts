export class UseCaseError extends Error {
    constructor(method:string, message: string) {
        super(message);
        this.name = `UseCase - ${method}`;
    }
}