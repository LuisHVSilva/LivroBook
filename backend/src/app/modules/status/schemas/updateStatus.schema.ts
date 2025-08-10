import { z } from "zod";
import {EntitiesMessage} from "@coreShared/messages/entities.message";

/**
 * Schema for updating a status.
 *
 * @property {number} id - The ID of the status to update.
 * @property {string} [newDescription] - The new description for the status (optional).
 * @property {boolean} [newActive] - The new active state for the status (optional).
 *
 * @returns {z.ZodObject} A Zod schema object for validating the update status request.
 *
 * @throws {Error} If the ID is not a positive integer, or if the description is less than 3 characters.
 * @throws {Error} If the active state is not provided when required.
 **/
export const UpdateStatusSchema = z.object({
    id: z.number().int().positive(EntitiesMessage.error.validation.idType),
    newDescription: z.string().optional(),
    newActive: z.boolean().optional()
});