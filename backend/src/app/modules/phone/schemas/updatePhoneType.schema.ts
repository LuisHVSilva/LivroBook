import { z } from "zod";
import {ZodValidator} from "@coreShared/validators/zod.validator";
import {PhoneTypeEntity} from "@phone/domain/entities/phoneType.entity";

export const UpdatePhoneTypeSchema = z.object({
    id: ZodValidator.intInputValue(),
    description: ZodValidator.stringInputValue(PhoneTypeEntity.MIN_DESC, PhoneTypeEntity.MAX_DESC, true),
    statusId: ZodValidator.intInputValue(undefined, undefined, true),
});