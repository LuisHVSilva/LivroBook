import { CountryDTO } from "@location/adapters/dtos/country.dto";
import { StateDTO } from "@location/adapters/dtos/state.dto";
import { CityDTO } from "@location/adapters/dtos/city.dto";

export type LocationFilterDTO = {
    countriesId?: number[];
    countriesStatusId?: number[];
    statesId?: number[];
    statesStatusId?: number[];
    citiesId?: number[];
    citiesStatusId?: number[];
}

export type CreateLocationDTO = {
    country: string;
    state: string;
    city: string;
}

export type CreateLocationResponseDTO = {
    country: string;
    state: string;
    city: string;
};

export class GetLocationsDTO {
    page?: string;
    limit?: string;
    countriesId?: string[];
    statesId?: string[];
    citiesId?: string[];
    entities?: string[];
}

export type GetLocationsResponseDTO = {
    page: number;
    limit: number;
    totalPages: number;
    data: {
        countries?: CountryDTO[];
        states?: StateDTO[];
        cities?: CityDTO[];
    }
};

export type UpdateLocationDTO = {
    current: {
        countryId: number;
        stateId: number;
        cityId: number;
    };

    update: {
        country?: CountryDTO;
        state?: StateDTO;
        city?: CityDTO;
    };
};

export type UpdateLocationResponseDTO = {
    country?: CountryDTO;
    state?: StateDTO;
    city?: CityDTO;
}

export type DeleteLocationDTO = {
    countriesId?: string;
    statesId?: string;
    citiesId?: string;
}

export type DeleteLocationResponseDTO = {
    message: string;
}