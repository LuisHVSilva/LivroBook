import {z} from "zod";
import {ZodValidator} from "@coreShared/validators/zod.validator";

export const FindCitiesSchema = z.object({
    id: ZodValidator.positiveIntArrayFromString(),
    description: ZodValidator.stringInputValue(undefined, undefined, true),
    state: ZodValidator.stringInputValue(undefined, undefined, true),
    status: ZodValidator.stringInputValue(undefined, undefined, true),
    page: ZodValidator.positiveIntFromString(),
    limit: ZodValidator.positiveIntFromString(),
});
