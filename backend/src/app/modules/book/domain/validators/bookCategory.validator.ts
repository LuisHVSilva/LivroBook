import {EntitiesMessage} from "@coreShared/messages/entities.message";
import {ValidationError} from "@coreShared/errors/classes.error";
import {BookCategoryEntity} from "@modules/book/domain/entities/bookCategory.entity";


export class BookCategoryValidator {
    static validateDescriptionLength(description: string, min: number, max: number): void {
        if (description.length < min || description.length > max) {
            throw new ValidationError(EntitiesMessage.error.validation.invalidLen(BookCategoryEntity.name, min, max));
        }
    }
}
