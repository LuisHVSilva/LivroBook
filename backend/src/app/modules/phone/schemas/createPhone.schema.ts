import { z } from "zod";
import {PhoneEntity} from "@phone/domain/entities/phone.entity";

export const CreatePhoneSchema = z.object({
    number: z.string().min(PhoneEntity.MIN_NUMBER).max(PhoneEntity.MAX_NUMBER),
    phoneCodeId: z.number(),
    phoneTypeId: z.number(),
})