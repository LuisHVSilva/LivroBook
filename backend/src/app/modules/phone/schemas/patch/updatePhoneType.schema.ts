import { z } from "zod";
import {ZodValidator} from "@coreShared/validators/zod.validator";
import {PhoneTypeEntity} from "@phone/domain/entities/phoneType.entity";
import {StatusEntity} from "@status/domain/entities/status.entity";

export const UpdatePhoneTypeSchema = z.object({
    id: ZodValidator.intInputValue(),
    description: ZodValidator.stringInputValue(PhoneTypeEntity.MIN_DESC, PhoneTypeEntity.MAX_DESC, true),
    status: ZodValidator.stringInputValue(StatusEntity.MIN_DESC, StatusEntity.MAX_DESC, true),
});