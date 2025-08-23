import {z} from "zod";
import {ZodValidator} from "@coreShared/validators/zod.validator";

export const FindStatusesSchema = z.object({
    id: ZodValidator.positiveIntArrayFromString(),
    active: ZodValidator.booleanArrayFromString(),
    page: ZodValidator.positiveIntFromString(),
    limit: ZodValidator.positiveIntFromString(),
});
