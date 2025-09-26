import {EntitiesMessage} from "@coreShared/messages/entities.message";
import {ValidationError} from "@coreShared/errors/domain.error";
import {BookEntity} from "@modules/book/domain/entities/book.entity";

export class BookValidator {
    static validateNameLength(description: string, min: number, max: number): void {
        if (description.length < min || description.length > max) {
            throw new ValidationError(EntitiesMessage.error.validation.invalidLen(BookEntity.name, min, max));
        }
    }
}
