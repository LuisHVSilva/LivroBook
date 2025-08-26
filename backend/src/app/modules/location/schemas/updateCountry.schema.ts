import { z } from "zod";
import {ZodValidator} from "@coreShared/validators/zod.validator";
import {CountryEntity} from "@location/domain/entities/country.entity";

export const UpdateCountrySchema = z.object({
    id: ZodValidator.intInputValue(),
    description: ZodValidator.stringInputValue(CountryEntity.MIN_DESC, CountryEntity.MAX_DESC, true),
    statusId: ZodValidator.intInputValue(undefined, undefined, true),
});