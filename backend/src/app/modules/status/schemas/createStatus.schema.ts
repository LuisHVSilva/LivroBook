import { z } from "zod";

import {StatusEntity} from "@status/domain/entities/status.entity";
import {ZodValidator} from "@coreShared/validators/zod.validator";

export const CreateStatusSchema = z.object({
    description: ZodValidator.stringInputValue(StatusEntity.MIN_DESC, StatusEntity.MAX_DESC),
});
