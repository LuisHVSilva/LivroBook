import { z } from "zod";
import {EntitiesMessage} from "@coreShared/messages/entities.message";

/**
 * Schema for delete a status.
 *
 * @property {number} id - The ID of the status to update.
 *
 * @returns {z.ZodObject} A Zod schema object for validating the update status request.
 *
 * @throws {Error} If the ID is not a positive integer.
 */
export const deleteStatusSchema = z.object({
    id: z.coerce.number().int().positive(EntitiesMessage.error.validation.idType),
});