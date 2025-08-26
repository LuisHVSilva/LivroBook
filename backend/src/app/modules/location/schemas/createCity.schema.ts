import { z } from "zod";

import {ZodValidator} from "@coreShared/validators/zod.validator";
import {CityEntity} from "@location/domain/entities/city.entity";

export const CreateCitySchema = z.object({
    description: ZodValidator.stringInputValue(CityEntity.MIN_DESC, CityEntity.MAX_DESC),
    stateId: ZodValidator.intInputValue(),
});
