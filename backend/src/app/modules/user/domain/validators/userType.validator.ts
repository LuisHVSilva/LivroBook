import {EntitiesMessage} from "@coreShared/messages/entities.message";
import {ValidationError} from "@coreShared/errors/classes.error";
import {UserTypeEntity} from "@user/domain/entities/userType.entity";

export class UserTypeValidator {
    static validateDescriptionLength(description: string, min: number, max: number): void {
        if (description.length < min || description.length > max) {
            throw new ValidationError(EntitiesMessage.error.validation.invalidLen(UserTypeEntity.name, min, max));
        }
    }
}
