import {z} from "zod";
import {ZodValidator} from "@coreShared/validators/zod.validator";

export const FindCountriesSchema = z.object({
    id: ZodValidator.positiveIntArrayFromString(),
    description: ZodValidator.stringInputValue(undefined, undefined, true),
    statusId: ZodValidator.positiveIntArrayFromString(),
    page: ZodValidator.positiveIntFromString(),
    limit: ZodValidator.positiveIntFromString(),
});
