import { z } from "zod";

import {ZodValidator} from "@coreShared/validators/zod.validator";
import {CityEntity} from "@location/domain/entities/city.entity";
import {StateEntity} from "@location/domain/entities/state.entity";

export const CreateCitySchema = z.object({
    description: ZodValidator.stringInputValue(CityEntity.MIN_DESC, CityEntity.MAX_DESC),
    state: ZodValidator.stringInputValue(StateEntity.MIN_DESC, StateEntity.MAX_DESC),
});
