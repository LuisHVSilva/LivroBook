import {z} from "zod";
import {ZodValidator} from "@coreShared/validators/zod.validator";

export const DeleteUserCredentialTypeSchema = z.object({
    id: ZodValidator.positiveIntArrayFromString(),
});
