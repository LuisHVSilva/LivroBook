import {z} from "zod";
import {ZodValidator} from "@coreShared/validators/zod.validator";

export const FindPhoneCodesSchema = z.object({
    id: ZodValidator.positiveIntArrayFromString(),
    ddiCode: ZodValidator.intInputValue(undefined, undefined, true),
    dddCode: ZodValidator.intInputValue(undefined, undefined, true),
    state: ZodValidator.stringInputValue(undefined, undefined, true),
    status: ZodValidator.stringInputValue(undefined, undefined, true),
    page: ZodValidator.positiveIntArrayFromString(),
    limit: ZodValidator.positiveIntArrayFromString(),
});

