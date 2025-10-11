import { z } from "zod";
import {ZodValidator} from "@coreShared/validators/zod.validator";
import {StateEntity} from "@location/domain/entities/state.entity";
import {CityEntity} from "@location/domain/entities/city.entity";
import {StatusEntity} from "@status/domain/entities/status.entity";

export const UpdateCitySchema = z.object({
    id: ZodValidator.intInputValue(),
    description: ZodValidator.stringInputValue(CityEntity.MIN_DESC, CityEntity.MAX_DESC, true),
    state: ZodValidator.stringInputValue(StateEntity.MIN_DESC, StateEntity.MAX_DESC, true),
    status: ZodValidator.stringInputValue(StatusEntity.MIN_DESC, StatusEntity.MAX_DESC, true),
}).strict();