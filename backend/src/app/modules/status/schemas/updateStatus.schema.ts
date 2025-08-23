import { z } from "zod";
import {ZodValidator} from "@coreShared/validators/zod.validator";
import {StatusEntity} from "@status/domain/entities/status.entity";

export const UpdateStatusSchema = z.object({
    id: ZodValidator.intInputValue(),
    description: ZodValidator.stringInputValue(StatusEntity.MIN_DESC, StatusEntity.MAX_DESC, true),
    active: ZodValidator.booleanInputValue(true),
});