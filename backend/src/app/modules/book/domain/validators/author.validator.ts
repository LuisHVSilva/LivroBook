import {EntitiesMessage} from "@coreShared/messages/entities.message";
import {AuthorEntity} from "@modules/book/domain/entities/author.entity";
import {ValidationError} from "@coreShared/errors/classes.error";

export class AuthorValidator {
    static validateNameLength(description: string, min: number, max: number): void {
        if (description.length < min || description.length > max) {
            throw new ValidationError(EntitiesMessage.error.validation.invalidLen(AuthorEntity.name, min, max));
        }
    }
}
