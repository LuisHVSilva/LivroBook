import {EntityError} from "@coreShared/errors/classes.error";
import {EntitiesMessage} from "@coreShared/messages/entities.message";
import {StatusEntity} from "@status/domain/entities/status.entity";

export class StatusValidator {
    static validateDescriptionLength(description: string, min: number, max: number) {
        if (description.length < min || description.length > max) {
            throw new EntityError(EntitiesMessage.error.validation.invalidLen(StatusEntity.ENTITY_NAME, min, max));
        }
    }
}
