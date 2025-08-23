import {z} from "zod";
import {ZodValidator} from "@coreShared/validators/zod.validator";

export const deleteDocumentTypesSchema = z.object({
    id: ZodValidator.positiveIntArrayFromString(),
});
