import { z } from "zod";
import {ZodValidator} from "@coreShared/validators/zod.validator";

export const FindPhoneTypesSchema = z.object({
    id: ZodValidator.positiveIntArrayFromString(),
    description: ZodValidator.stringInputValue(undefined, undefined, true),
    status: ZodValidator.stringInputValue(undefined, undefined, true),
    page: ZodValidator.positiveIntArrayFromString(),
    limit: ZodValidator.positiveIntArrayFromString(),
});