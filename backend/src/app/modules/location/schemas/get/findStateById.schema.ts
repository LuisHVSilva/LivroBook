import {z} from "zod";
import {ZodValidator} from "@coreShared/validators/zod.validator";

export const FindStateByIdSchema = z.object({
    id: ZodValidator.positiveIntArrayFromString(),
}).strict();
