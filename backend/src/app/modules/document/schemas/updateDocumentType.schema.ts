import { z } from "zod";
import {EntitiesMessage} from "@coreShared/messages/entities.message";

export const UpdateDocumentTypeSchema = z.object({
    id: z.number().int().positive(EntitiesMessage.error.validation.idType),
    newDescription: z.string().optional(),
    newCountryId: z.number().int().positive(EntitiesMessage.error.validation.idType).optional(),
    newStatusId: z.number().int().positive(EntitiesMessage.error.validation.idType).optional(),
});