import {EntitiesMessage} from "@coreShared/messages/entities.message";
import {ValidationError} from "@coreShared/errors/domain.error";

export class UserValidator {
    static validateName(name: string, min: number, max:number): void {
        if (name.length <= min || name.length > max) {
            throw new ValidationError(EntitiesMessage.error.validation.invalidLen('name', min, max));
        }
    }
    
    static validateEmail(email: string): void {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(email)) {
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

    static validateDocumentsFields(document?: string, documentTypeId?: number) {
        if (document !== undefined && documentTypeId === undefined) {
            throw new ValidationError(EntitiesMessage.error.validation.nullField('DocumentTypeId'))
        }

        if(documentTypeId !== undefined && document === undefined) {
            throw new ValidationError(EntitiesMessage.error.validation.nullField('Document'))
        }
    }
}
