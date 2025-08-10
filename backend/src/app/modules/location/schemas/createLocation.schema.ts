import { z } from "zod";
import {EntitiesMessage} from "@coreShared/messages/entities.message";
import {CountryEntity} from "@location/domain/entities/country.entity";
import {StateEntity} from "@location/domain/entities/state.entity";
import {CityEntity} from "@location/domain/entities/city.entity";

export const CreateLocationSchema = z.object({
    country: z.string().min(3, EntitiesMessage.error.validation.invalidMinDescriptionLen(CountryEntity.MIN_DESC)),
    state: z.string().min(3, EntitiesMessage.error.validation.invalidMinDescriptionLen(StateEntity.MIN_DESC)),
    city: z.string().min(3, EntitiesMessage.error.validation.invalidMinDescriptionLen(CityEntity.MIN_DESC)),
});
