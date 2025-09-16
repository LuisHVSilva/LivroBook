import {z} from "zod";
import {ZodValidator} from "@coreShared/validators/zod.validator";

export const FindUserSchema = z.object({
    id: ZodValidator.positiveIntArrayFromString(),
    name: ZodValidator.stringInputValue(undefined, undefined, true),
    email: ZodValidator.stringInputValue(undefined, undefined, true),
    document: ZodValidator.stringInputValue(undefined, undefined, true),
    birthday: ZodValidator.dateArrayFromString(),
    userTypeId: ZodValidator.positiveIntArrayFromString(),
    cityId: ZodValidator.positiveIntArrayFromString(),
    userCredentialId: ZodValidator.positiveIntArrayFromString(),
    documentTypeId: ZodValidator.positiveIntArrayFromString(),
    phoneId: ZodValidator.positiveIntArrayFromString(),
    statusId: ZodValidator.positiveIntArrayFromString(),
    page: ZodValidator.positiveIntArrayFromString(),
    limit: ZodValidator.positiveIntArrayFromString(),
});

