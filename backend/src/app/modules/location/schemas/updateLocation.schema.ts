import {z} from "zod";
import {EntitiesMessage} from "@coreShared/messages/entities.message";
import {CountryEntity} from "@location/domain/entities/country.entity";
import {StateEntity} from "@location/domain/entities/state.entity";
import {CityEntity} from "@location/domain/entities/city.entity";

const minCountryLen = CountryEntity.MIN_DESC;
const maxCountryLen = CountryEntity.MAX_DESC;

const minStateLen = StateEntity.MIN_DESC;
const maxStateLen = StateEntity.MAX_DESC;

const minCityLen = CityEntity.MIN_DESC;
const maxCityLen = CityEntity.MAX_DESC;

const CountryUpdateSchema = z.object({
    description: z
        .string()
        .min(minCountryLen, EntitiesMessage.error.validation.invalidMinDescriptionLen(minCountryLen))
        .max(maxCountryLen, EntitiesMessage.error.validation.invalidMaxDescriptionLen(maxCountryLen))
        .optional(),
    statusId: z.number().int().positive(EntitiesMessage.error.validation.idType).optional(),
});

const StateUpdateSchema = z.object({
    description: z
        .string()
        .min(minStateLen, EntitiesMessage.error.validation.invalidMinDescriptionLen(minStateLen))
        .max(maxStateLen, EntitiesMessage.error.validation.invalidMaxDescriptionLen(maxStateLen))
        .optional(),
    statusId: z.number().int().positive(EntitiesMessage.error.validation.idType).optional(),
});

const CityUpdateSchema = z.object({
    description: z
        .string()
        .min(minCityLen, EntitiesMessage.error.validation.invalidMinDescriptionLen(minCityLen))
        .max(maxCityLen, EntitiesMessage.error.validation.invalidMaxDescriptionLen(maxCityLen))
        .optional(),
    statusId: z.number().int().positive(EntitiesMessage.error.validation.idType).optional(),
});

export const UpdateLocationSchema = z.object({
    current: z.object({
        countryId: z.number().int().positive(EntitiesMessage.error.validation.idType),
        stateId: z.number().int().positive(EntitiesMessage.error.validation.idType),
        cityId: z.number().int().positive(EntitiesMessage.error.validation.idType),
    }),
    update: z.object({
        country: CountryUpdateSchema.optional(),
        state: StateUpdateSchema.optional(),
        city: CityUpdateSchema.optional(),
    }),
});
