import {z} from "zod";
import {ZodValidator} from "@coreShared/validators/zod.validator";

export const FindCityByIdSchema = z.object({
    id: ZodValidator.positiveIntArrayFromString(),
}).strict();
