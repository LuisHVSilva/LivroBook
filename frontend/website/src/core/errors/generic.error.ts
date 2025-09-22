export class DomainError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "DomainError";
    }
}

export class ConflictError extends DomainError {
    constructor(message: string) {
        super(message);
        this.name = "ConflictError";
    }
}

export class NotFoundError extends DomainError {
    constructor(message: string) {
        super(message);
        this.name = "NotFoundError";
    }
}

export class ValidationError extends DomainError {
    constructor(message: string) {
        super(message);
        this.name = "ValidationError";
    }
}

export class InactiveError extends DomainError {
    constructor(message: string) {
        super(message);
        this.name = "InactiveError";
    }
}

export class NullFieldError extends DomainError {
    constructor(message: string) {
        super(message);
        this.name = "NullFieldError";
    }
}