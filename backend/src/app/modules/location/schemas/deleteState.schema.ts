import {z} from "zod";
import {ZodValidator} from "@coreShared/validators/zod.validator";

export const DeleteStateSchema = z.object({
    id: ZodValidator.positiveIntArrayFromString(),
});
