import {EntitiesMessage} from "@coreShared/messages/entities.message";
import {ValidationError} from "@coreShared/errors/classes.error";
import {PublisherEntity} from "@modules/book/domain/entities/publisher.entity";

export class PublisherValidator {
    static validateNameLength(description: string, min: number, max: number): void {
        if (description.length < min || description.length > max) {
            throw new ValidationError(EntitiesMessage.error.validation.invalidLen(PublisherEntity.name, min, max));
        }
    }
}
