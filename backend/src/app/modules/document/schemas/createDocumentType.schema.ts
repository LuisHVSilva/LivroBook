import { z } from "zod";
import {EntitiesMessage} from "@coreShared/messages/entities.message";

export const CreateDocumentTypeSchema = z.object({
    description: z.string().nonempty(EntitiesMessage.error.validation.descriptionRequired),
    countryId: z.number().int().positive(EntitiesMessage.error.validation.idType),
});
