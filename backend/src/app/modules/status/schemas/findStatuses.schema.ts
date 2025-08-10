import {z} from "zod";
import {EntitiesMessage} from "@coreShared/messages/entities.message";

/**
 * Schema for validating query parameters when retrieving a list of statuses.
 *
 * @property {string} [page] - Optional page number as a string. Must be a positive integer if provided.
 * @property {string} [limit] - Optional limit of items per page as a string. Must be a positive integer if provided.
 * @property {string} [active] - Optional filter for status activity. Accepts "true" or "false" (case-insensitive).
 *
 * @returns {z.ZodObject} A Zod schema object for validating and transforming the query parameters.
 *
 * @throws {Error} If the 'page' or 'limit' is not a positive integer,
 *                 or if 'active' is not a valid boolean string.
 */
export const FindStatusesSchema = z.object({
    page: z.string()
        .optional()
        .transform((val: string | undefined): number | undefined => (val !== undefined ? Number(val) : undefined))
        .refine(val => val === undefined || (!isNaN(val) && Number.isInteger(val) && val > 0), {
            message: EntitiesMessage.error.validation.numberPositive
        }),
    limit: z.string()
        .optional()
        .transform((val: string | undefined): number | undefined => (val !== undefined ? Number(val) : undefined))
        .refine(val => val === undefined || (!isNaN(val) && Number.isInteger(val) && val > 0), {
            message: EntitiesMessage.error.validation.numberPositive
        }),
    active: z
        .string()
        .optional()
        .transform((val) => {
            if (val === undefined) return undefined;
            if (val.toLowerCase() === "true") return true;
            if (val.toLowerCase() === "false") return false;
            throw new Error(EntitiesMessage.error.validation.boolType);
        })
});
