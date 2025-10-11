import {z} from "zod";
import {ZodValidator} from "@coreShared/validators/zod.validator";

export const FindUserSchema = z.object({
    id: ZodValidator.positiveIntArrayFromString(),
    name: ZodValidator.stringInputValue(undefined, undefined, true),
    email: ZodValidator.stringInputValue(undefined, undefined, true),
    document: ZodValidator.stringInputValue(undefined, undefined, true),
    birthday: ZodValidator.dateArrayFromString(),
    userType: ZodValidator.stringInputValue(undefined, undefined, true),
    city: ZodValidator.stringInputValue(undefined, undefined, true),
    userCredential: ZodValidator.stringInputValue(undefined, undefined, true),
    documentType: ZodValidator.stringInputValue(undefined, undefined, true),
    phone: ZodValidator.stringInputValue(undefined, undefined, true),
    status: ZodValidator.stringInputValue(undefined, undefined, true),
    page: ZodValidator.positiveIntArrayFromString(),
    limit: ZodValidator.positiveIntArrayFromString(),
}).strict();

