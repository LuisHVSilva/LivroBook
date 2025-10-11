import {z} from "zod";
import {ZodValidator} from "@coreShared/validators/zod.validator";

export const FindDocumentTypeByIdSchema = z.object({
    id: ZodValidator.positiveIntArrayFromString(),
}).strict();
