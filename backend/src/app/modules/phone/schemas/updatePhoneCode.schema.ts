import { z } from "zod";
import {ZodValidator} from "@coreShared/validators/zod.validator";

export const UpdatePhoneCodeSchema = z.object({
    id: ZodValidator.intInputValue(),
    ddiCode: ZodValidator.intInputValue(undefined, undefined, true),
    dddCode: ZodValidator.intInputValue(undefined, undefined, true),
    stateId: ZodValidator.intInputValue(undefined, undefined, true),
    statusId: ZodValidator.intInputValue(undefined, undefined, true),
});