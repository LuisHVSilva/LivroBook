import {EntityError} from "@coreShared/errors/classes.error";
import {EntitiesMessage} from "@coreShared/messages/entities.message";
import {PhoneTypeEntity} from "@phone/domain/entities/phoneType.entity";

export class PhoneTypeValidator {
    static validateDescriptionLength(description: string, min: number, max: number) {
        if (description.length < min || description.length > max) {
            throw new EntityError(EntitiesMessage.error.validation.invalidLen(PhoneTypeEntity.name, min, max));
        }
    }
}