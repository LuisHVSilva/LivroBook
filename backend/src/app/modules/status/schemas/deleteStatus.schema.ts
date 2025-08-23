import { z } from "zod";
import {ZodValidator} from "@coreShared/validators/zod.validator";

export const deleteStatusSchema = z.object({
    id: ZodValidator.positiveIntArrayFromString(),
});
