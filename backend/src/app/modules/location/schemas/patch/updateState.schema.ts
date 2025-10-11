import { z } from "zod";
import {ZodValidator} from "@coreShared/validators/zod.validator";
import {StateEntity} from "@location/domain/entities/state.entity";
import {CountryEntity} from "@location/domain/entities/country.entity";
import {StatusEntity} from "@status/domain/entities/status.entity";

export const UpdateStateSchema = z.object({
    id: ZodValidator.intInputValue(),
    description: ZodValidator.stringInputValue(StateEntity.MIN_DESC, StateEntity.MAX_DESC, true),
    country: ZodValidator.stringInputValue(CountryEntity.MIN_DESC, CountryEntity.MAX_DESC, true),
    status: ZodValidator.intInputValue(StatusEntity.MIN_DESC, StatusEntity.MAX_DESC, true),
}).strict();