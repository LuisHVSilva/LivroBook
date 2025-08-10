import {z} from "zod";
import {EntitiesMessage} from "@coreShared/messages/entities.message";

export const deleteDocumentTypesSchema = z.object({
    ids: z
        .string()
        .transform((val): number[] =>
            val
                .split(',')
                .map((item) => Number(item.trim()))
        )
        .refine((arr) =>
                arr.length > 0 && arr.every((n) => Number.isInteger(n) && n > 0),
            {message: EntitiesMessage.error.validation.idType}
        ),

});
