import {z} from "zod";
import {ZodValidator} from "@coreShared/validators/zod.validator";

export const FindStatesSchema = z.object({
    id: ZodValidator.positiveIntArrayFromString(),
    description: ZodValidator.stringInputValue(undefined, undefined, true),
    countryId: ZodValidator.positiveIntArrayFromString(),
    statusId: ZodValidator.positiveIntArrayFromString(),
    page: ZodValidator.positiveIntFromString(),
    limit: ZodValidator.positiveIntFromString(),
});
