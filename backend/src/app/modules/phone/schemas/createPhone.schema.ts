import { z } from "zod";
import {PhoneEntity} from "@phone/domain/entities/phone.entity";
import {ZodValidator} from "@coreShared/validators/zod.validator";

export const CreatePhoneSchema = z.object({

    number: ZodValidator.stringInputValue(PhoneEntity.MIN_NUMBER, PhoneEntity.MAX_NUMBER),
    phoneCodeId: ZodValidator.intInputValue(),
    phoneTypeId: ZodValidator.intInputValue(),
})