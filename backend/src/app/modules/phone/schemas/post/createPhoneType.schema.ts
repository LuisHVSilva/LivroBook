import { z } from "zod";
import {ZodValidator} from "@coreShared/validators/zod.validator";
import {PhoneTypeEntity} from "@phone/domain/entities/phoneType.entity";
import {PhoneEntity} from "@phone/domain/entities/phone.entity";

export const CreatePhoneTypeSchema = z.object({
    description: ZodValidator.stringInputValue(PhoneTypeEntity.MIN_DESC, PhoneEntity.MAX_NUMBER),
});
