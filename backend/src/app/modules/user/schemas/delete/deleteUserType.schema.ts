import {z} from "zod";
import {ZodValidator} from "@coreShared/validators/zod.validator";

export const DeleteUserTypesSchema = z.object({
    id: ZodValidator.positiveIntArrayFromString(),
});
