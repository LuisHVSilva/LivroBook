import { z } from "zod";
import {PhoneCodeEntity} from "@phone/domain/entities/phoneCode.entity";

export const CreatePhoneCodeSchema = z.object({
    ddiCode: z.number().int().min(PhoneCodeEntity.MIN_DDI_VALUE).max(PhoneCodeEntity.MAX_DDI_VALUE),
    dddCode: z.number().min(PhoneCodeEntity.MIN_DDD_VALUE).max(PhoneCodeEntity.MAX_DDD_VALUE),
    stateId: z.number().min(1),
})