import { z } from "zod";
import {PhoneEntity} from "@phone/domain/entities/phone.entity";
import {ZodValidator} from "@coreShared/validators/zod.validator";
import {PhoneTypeEntity} from "@phone/domain/entities/phoneType.entity";
import {PhoneCodeEntity} from "@phone/domain/entities/phoneCode.entity";

export const CreatePhoneSchema = z.object({
    number: ZodValidator.stringInputValue(PhoneEntity.MIN_NUMBER, PhoneEntity.MAX_NUMBER),
    phoneCode: {
        ddiCode: ZodValidator.intInputValue(PhoneCodeEntity.MIN_DDI_VALUE, PhoneCodeEntity.MAX_DDI_VALUE),
        dddCode: ZodValidator.intInputValue(PhoneCodeEntity.MIN_DDD_VALUE, PhoneCodeEntity.MAX_DDD_VALUE),
    },
    phoneType: ZodValidator.stringInputValue(PhoneTypeEntity.MIN_DESC, PhoneEntity.MAX_NUMBER),
})