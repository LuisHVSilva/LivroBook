import {z} from "zod";
import {ZodValidator} from "@coreShared/validators/zod.validator";

export const DeletePhoneTypesSchema = z.object({
    id: ZodValidator.positiveIntArrayFromString(),
});
