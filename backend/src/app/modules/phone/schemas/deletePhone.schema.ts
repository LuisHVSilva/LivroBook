import {z} from "zod";
import {ZodValidator} from "@coreShared/validators/zod.validator";

export const DeletePhoneSchema = z.object({
    id: ZodValidator.positiveIntArrayFromString(),
});
