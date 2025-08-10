import {EntityError} from "@coreShared/errors/entityError";
import {EntitiesMessage} from "@coreShared/messages/entities.message";

export class PhoneCodeValidator {
    static validateDdiCodeLength(ddiCode: string, min: number, max: number) {
        if (ddiCode.length < min || ddiCode.length > max) {
            throw new EntityError(EntitiesMessage.error.validation.invalidLen('ddi', min, max));
        }
    }

    static validateDddCodeLength(dddCode: string, min: number, max: number) {
        if (dddCode.length < min || dddCode.length > max) {
            throw new EntityError(EntitiesMessage.error.validation.invalidLen('ddd', min, max));
        }
    }
}
