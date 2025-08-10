import { z } from "zod";
import {EntitiesMessage} from "@coreShared/messages/entities.message";

/**
 * Schema for creating a status.
 *
 * @property {number} description - The description of the new status.
 *
 * @returns {z.ZodObject} A Zod schema object for validating the update status request.
 *
 * @throws {Error} If the description doesn't exist.
 */
export const CreateStatusSchema = z.object({
    description: z.string().nonempty(EntitiesMessage.error.validation.descriptionRequired),
});
