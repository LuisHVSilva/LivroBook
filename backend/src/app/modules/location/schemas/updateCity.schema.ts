import { z } from "zod";
import {ZodValidator} from "@coreShared/validators/zod.validator";
import {StateEntity} from "@location/domain/entities/state.entity";

export const UpdateCitySchema = z.object({
    id: ZodValidator.intInputValue(),
    description: ZodValidator.stringInputValue(StateEntity.MIN_DESC, StateEntity.MAX_DESC, true),
    stateId: ZodValidator.intInputValue(undefined, undefined, true),
    statusId: ZodValidator.intInputValue(undefined, undefined, true),
});