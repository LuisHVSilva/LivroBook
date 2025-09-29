import { z } from "zod";
import {ZodValidator} from "@coreShared/validators/zod.validator";

export const GetModelAttributesSchema = z.object({
    entityName: ZodValidator.stringInputValue(),
})