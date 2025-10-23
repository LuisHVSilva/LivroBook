import {EntitiesMessage} from "@coreShared/messages/entities.message";
import {ValidationError} from "@coreShared/errors/classes.error";
import {DocumentTypeEntity} from "@document/domain/entities/documentType.entity";

export class DocumentTypeValidator {
    static validateDescriptionLength(description: string, min: number, max: number): void {
        if (description.length < min || description.length > max) {
            throw new ValidationError(EntitiesMessage.error.validation.invalidLen(DocumentTypeEntity.ENTITY_NAME, min, max));
        }
    }
}
