import {z} from "zod";
import {ZodValidator} from "@coreShared/validators/zod.validator";

export const DeleteCitySchema = z.object({
    id: ZodValidator.positiveIntArrayFromString(),
});
