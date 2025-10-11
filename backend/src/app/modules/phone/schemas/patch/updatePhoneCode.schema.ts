import { z } from "zod";
import {ZodValidator} from "@coreShared/validators/zod.validator";
import {StatusEntity} from "@status/domain/entities/status.entity";
import {StateEntity} from "@location/domain/entities/state.entity";
import {PhoneCodeEntity} from "@phone/domain/entities/phoneCode.entity";

export const UpdatePhoneCodeSchema = z.object({
    id: ZodValidator.intInputValue(),
    ddiCode: ZodValidator.intInputValue(PhoneCodeEntity.MIN_DDI_VALUE, PhoneCodeEntity.MAX_DDI_VALUE, true),
    dddCode: ZodValidator.intInputValue(PhoneCodeEntity.MIN_DDD_VALUE, PhoneCodeEntity.MAX_DDD_VALUE, true),
    state: ZodValidator.stringInputValue(StateEntity.MIN_DESC, StateEntity.MAX_DESC, true),
    status: ZodValidator.stringInputValue(StatusEntity.MIN_DESC, StatusEntity.MAX_DESC, true),
});