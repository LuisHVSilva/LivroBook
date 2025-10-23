import {EntityError} from "@coreShared/errors/classes.error";
import {EntitiesMessage} from "@coreShared/messages/entities.message";

export class PhoneCodeValidator {
    static validateDdiCodeLength(ddiCode: number, min: number, max: number) {
        if (ddiCode < min || ddiCode.toString().length > max) {
            throw new EntityError(EntitiesMessage.error.validation.invalidLen('ddi', min, max));
        }
    }

    static validateDddCodeLength(dddCode: number, min: number, max: number) {
        if (dddCode < min || dddCode.toString().length > max) {
            throw new EntityError(EntitiesMessage.error.validation.invalidLen('ddd', min, max));
        }
    }
}
