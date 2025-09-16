import {z} from "zod";
import {ZodValidator} from "@coreShared/validators/zod.validator";

export const DeleteUserSchema = z.object({
    id: ZodValidator.positiveIntArrayFromString(),
});
