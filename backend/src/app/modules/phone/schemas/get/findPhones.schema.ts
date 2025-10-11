import {z} from "zod";
import {ZodValidator} from "@coreShared/validators/zod.validator";

export const FindPhonesSchema = z.object({
    id: ZodValidator.positiveIntArrayFromString(),
    number: ZodValidator.stringInputValue(undefined, undefined, true),
    ddiCode: ZodValidator.intInputValue(undefined, undefined, true),
    dddCode: ZodValidator.intInputValue(undefined, undefined, true),
    phoneType: ZodValidator.stringInputValue(undefined, undefined, true),
    status: ZodValidator.stringInputValue(undefined, undefined, true),
    page: ZodValidator.positiveIntArrayFromString(),
    limit: ZodValidator.positiveIntArrayFromString(),
});
