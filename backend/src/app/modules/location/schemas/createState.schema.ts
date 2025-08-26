import { z } from "zod";

import {ZodValidator} from "@coreShared/validators/zod.validator";
import {StateEntity} from "@location/domain/entities/state.entity";

export const CreateStateSchema = z.object({
    description: ZodValidator.stringInputValue(StateEntity.MIN_DESC, StateEntity.MAX_DESC),
    countryId: ZodValidator.intInputValue(),
});
