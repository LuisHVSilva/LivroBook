import { z } from "zod";
import {PhoneCodeEntity} from "@phone/domain/entities/phoneCode.entity";
import {ZodValidator} from "@coreShared/validators/zod.validator";

export const CreatePhoneCodeSchema = z.object({
    ddiCode: ZodValidator.intInputValue(PhoneCodeEntity.MIN_DDI_VALUE, PhoneCodeEntity.MAX_DDI_VALUE),
    dddCode: ZodValidator.intInputValue(PhoneCodeEntity.MIN_DDD_VALUE, PhoneCodeEntity.MAX_DDD_VALUE),
    stateId: ZodValidator.intInputValue(),
})