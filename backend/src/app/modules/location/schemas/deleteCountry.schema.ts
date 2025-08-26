import {z} from "zod";
import {ZodValidator} from "@coreShared/validators/zod.validator";

export const DeleteCountrySchema = z.object({
    id: ZodValidator.positiveIntArrayFromString(),
});
