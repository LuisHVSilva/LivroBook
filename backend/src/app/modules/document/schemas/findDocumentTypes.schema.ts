import {z} from "zod";
import {EntitiesMessage} from "@coreShared/messages/entities.message";

export const FindDocumentTypesDTOSchema = z.object({
    ids: z.string().optional(),
    descriptions: z.string().optional(),
    countiesIds: z.string().optional(),
    statusesIds: z.string().optional(),
    page: z.string().optional(),
    limit: z.string().optional(),
});


export const FindDocumentTypesSchema = FindDocumentTypesDTOSchema.extend({
    page: z.string()
        .optional()
        .transform(val => (val !== undefined ? Number(val) : undefined))
        .refine(val => val === undefined || (!isNaN(val) && Number.isInteger(val) && val > 0), {
            message: EntitiesMessage.error.validation.numberPositive
        }),
    limit: z.string()
        .optional()
        .transform(val => (val !== undefined ? Number(val) : undefined))
        .refine(val => val === undefined || (!isNaN(val) && Number.isInteger(val) && val > 0), {
            message: EntitiesMessage.error.validation.numberPositive
        }),
});

