import { z } from "zod";
import {ZodValidator} from "@coreShared/validators/zod.validator";
import {PhoneEntity} from "@phone/domain/entities/phone.entity";

export const UpdatePhoneSchema = z.object({
    id: ZodValidator.intInputValue(),
    number: ZodValidator.stringInputValue(PhoneEntity.MIN_NUMBER, PhoneEntity.MAX_NUMBER, true),
    phoneCodeId: ZodValidator.intInputValue(undefined, undefined, true),
    phoneTypeId: ZodValidator.intInputValue(undefined, undefined, true),
    statusId: ZodValidator.intInputValue(undefined, undefined, true),
});