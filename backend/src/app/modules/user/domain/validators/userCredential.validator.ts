import {EntitiesMessage} from "@coreShared/messages/entities.message";
import {ValidationError} from "@coreShared/errors/classes.error";
import {isIP} from "net";

export class UserCredentialValidator {
    static validateLoginAttemptsType(loginAttempts: number): void {
        if (loginAttempts < 0) {
            throw new ValidationError(EntitiesMessage.error.validation.invalidType('Login attempts', 'inteiro positivo'));
        }
    }

    static validateLastLoginIp(lastLoginIP?: string): void {
        if (lastLoginIP != undefined && isIP(lastLoginIP) !== 4) {
            throw new ValidationError(EntitiesMessage.error.validation.ipInvalid);
        }
    }

    static validatePassword(password: string, min: number): void {
        const hasMinLength: boolean = password.length >= min;
        const hasUppercase: boolean = /[A-Z]/.test(password);
        const hasSpecialChar: boolean = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        if (!hasMinLength) {
            throw new ValidationError(EntitiesMessage.error.validation.invalidMinLen('password', min.toString()));
        }
        if (!hasUppercase) {
            throw new ValidationError(EntitiesMessage.error.validation.passwordUpperCase);
        }
        if (!hasSpecialChar) {
            throw new ValidationError(EntitiesMessage.error.validation.passwordSpecialCharacter);
        }
    }
}
