import {EntitiesMessage} from "@coreShared/messages/entities.message";

export class PhoneValidator {
    static validateNumberFormat(number: string): void {
        const digitsOnly = /^\d+$/;
        if (!digitsOnly.test(number)) {
            throw new Error(EntitiesMessage.error.validation.numberType);
        }
    }

    static validateNumberLength(number: string, min: number, max: number): void {
        if (number.length < min || number.length > max) {
            throw new Error(EntitiesMessage.error.validation.invalidLen('number', min, max));
        }
    }
}