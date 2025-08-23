import {z} from "zod";
import {ZodValidator} from "@coreShared/validators/zod.validator";

export const DeletePhoneCodesSchema = z.object({
    id: ZodValidator.positiveIntArrayFromString(),
});
