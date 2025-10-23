import {EntitiesMessage} from "@coreShared/messages/entities.message";
import {ValidationError} from "@coreShared/errors/classes.error";

export class UserValidator {
    static validateName(name: string, min: number, max:number): void {
        if (name.length <= min || name.length > max) {
            throw new ValidationError(EntitiesMessage.error.validation.invalidLen('name', min, max));
        }
    }
    
    static validateEmail(email: string): void {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new ValidationError(EntitiesMessage.error.validation.emailFormat);
        }
    }

    static validateIsUnder18(birthday: Date): void {
        const today = new Date();
        let age: number = today.getFullYear() - birthday.getFullYear();
        const month: number = today.getMonth() - birthday.getMonth();

        if(month < 0 || (month === 0 && today.getDate() < birthday.getDate())) {
            age--;
        }

        if(age < 18) {
            throw new Error("User must be at least 18 years old.");
        }
    }

    static validateDocumentsFields(document?: string | null, documentType?: string | null) {
        const isDocumentEmpty = document == null;
        const isTypeEmpty = documentType == null;

        if (!isDocumentEmpty && isTypeEmpty) {
            throw new ValidationError(
                EntitiesMessage.error.validation.nullField('DocumentType')
            );
        }

        if (isDocumentEmpty && !isTypeEmpty) {
            throw new ValidationError(
                EntitiesMessage.error.validation.nullField('Document')
            );
        }
    }
}
