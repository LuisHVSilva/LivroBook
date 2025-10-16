import { z } from "zod";
import {ZodValidator} from "@coreShared/validators/zod.validator";
import {PhoneEntity} from "@phone/domain/entities/phone.entity";
import {StatusEntity} from "@status/domain/entities/status.entity";
import {PhoneTypeEntity} from "@phone/domain/entities/phoneType.entity";
import {PhoneCodeEntity} from "@phone/domain/entities/phoneCode.entity";

const updatePhoneCodeSchema = z.object({
    ddiCode: ZodValidator.intInputValue(PhoneCodeEntity.MIN_DDI_VALUE, PhoneCodeEntity.MAX_DDI_VALUE, true),
    dddCode: ZodValidator.intInputValue(PhoneCodeEntity.MIN_DDD_VALUE, PhoneCodeEntity.MAX_DDD_VALUE, true),
})

export const UpdatePhoneSchema = z.object({
    id: ZodValidator.intInputValue(),
    number: ZodValidator.stringInputValue(PhoneEntity.MIN_NUMBER, PhoneEntity.MAX_NUMBER, true),
    phoneCode: updatePhoneCodeSchema.optional(),
    phoneType: ZodValidator.stringInputValue(PhoneTypeEntity.MIN_DESC, PhoneTypeEntity.MAX_DESC, true),
    status: ZodValidator.stringInputValue(StatusEntity.MIN_DESC, StatusEntity.MAX_DESC, true),
});
