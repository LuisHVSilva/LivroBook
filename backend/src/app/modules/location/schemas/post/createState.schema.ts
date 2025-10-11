import { z } from "zod";

import {ZodValidator} from "@coreShared/validators/zod.validator";
import {StateEntity} from "@location/domain/entities/state.entity";
import {CountryEntity} from "@location/domain/entities/country.entity";

export const CreateStateSchema = z.object({
    description: ZodValidator.stringInputValue(StateEntity.MIN_DESC, StateEntity.MAX_DESC),
    country: ZodValidator.stringInputValue(CountryEntity.MIN_DESC, StateEntity.MAX_DESC),
});
