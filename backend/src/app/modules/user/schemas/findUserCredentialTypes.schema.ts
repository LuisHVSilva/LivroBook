import {z} from "zod";
import {ZodValidator} from "@coreShared/validators/zod.validator";

export const FindUserCredentialTypesSchema = z.object({
    id: ZodValidator.positiveIntArrayFromString(),
    description: ZodValidator.stringInputValue(undefined, undefined, true),
    statusId: ZodValidator.positiveIntArrayFromString(),
    page: ZodValidator.positiveIntArrayFromString(),
    limit: ZodValidator.positiveIntArrayFromString(),
});

