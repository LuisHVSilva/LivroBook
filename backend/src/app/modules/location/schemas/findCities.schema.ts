import {z} from "zod";
import {ZodValidator} from "@coreShared/validators/zod.validator";

export const FindCitiesSchema = z.object({
    id: ZodValidator.positiveIntArrayFromString(),
    description: ZodValidator.stringInputValue(undefined, undefined, true),
    stateId: ZodValidator.positiveIntArrayFromString(),
    statusId: ZodValidator.positiveIntArrayFromString(),
    page: ZodValidator.positiveIntFromString(),
    limit: ZodValidator.positiveIntFromString(),
});
