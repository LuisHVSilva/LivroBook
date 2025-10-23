import {EntitiesMessage} from "@coreShared/messages/entities.message";
import {ValidationError} from "@coreShared/errors/classes.error";
import {LanguageEntity} from "@modules/book/domain/entities/language.entity";

export class LanguageValidator {
    static validateDescriptionLength(description: string, min: number, max: number): void {
        if (description.length < min || description.length > max) {
            throw new ValidationError(EntitiesMessage.error.validation.invalidLen(LanguageEntity.name, min, max));
        }
    }
}
