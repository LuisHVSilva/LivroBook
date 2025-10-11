import { z } from "zod";
import {ZodValidator} from "@coreShared/validators/zod.validator";
import {CountryEntity} from "@location/domain/entities/country.entity";
import {StatusEntity} from "@status/domain/entities/status.entity";

export const UpdateCountrySchema = z.object({
    id: ZodValidator.intInputValue(),
    description: ZodValidator.stringInputValue(CountryEntity.MIN_DESC, CountryEntity.MAX_DESC, true),
    status: ZodValidator.stringInputValue(StatusEntity.MIN_DESC, StatusEntity.MAX_DESC, true),
}).strict();