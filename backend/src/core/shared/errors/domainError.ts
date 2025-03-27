export class DomainError extends Error {
    constructor(domainName: string, message: string) {
        super(message);
        this.name = `DomainError - ${domainName}`;
        Object.setPrototypeOf(this, DomainError.prototype);
    }
}
