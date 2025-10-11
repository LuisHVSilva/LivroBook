import {z} from "zod";
import {ZodValidator} from "@coreShared/validators/zod.validator";

export const FindPhoneCodeByIdSchema = z.object({
    id: ZodValidator.positiveIntArrayFromString(),
}).strict();
