import {EntityError} from "@coreShared/errors/entityError";
import {EntitiesMessage} from "@coreShared/messages/entities.message";

export class CityValidator {
    static validateDescriptionLength(description: string, min: number, max: number): void {
        if (description.length < min || description.length > max) {
            throw new EntityError(EntitiesMessage.error.validation.invalidLen('description', min, max));
        }
    }
}
