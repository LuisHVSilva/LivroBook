import { z } from "zod";

import {ZodValidator} from "@coreShared/validators/zod.validator";
import {CountryEntity} from "@location/domain/entities/country.entity";

export const CreateCountrySchema = z.object({
    description: ZodValidator.stringInputValue(CountryEntity.MIN_DESC, CountryEntity.MAX_DESC),
});
