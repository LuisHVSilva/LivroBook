import axios from "../client/http.ts";
import type {
    FindCitiesRawDTO, FindCitiesResponseDTO,
    FindCountriesRawDTO,
    FindCountriesResponseDTO,
    FindStatesRawDTO,
    FindStatesResponseDTO
} from "../types/location.types.ts";
import {errorMessages} from "../../constants/errorMessages.ts";
import {locationServiceUrl} from "../../constants/url.constant.ts";
import {serverUtil} from "../../utils/server.util.ts";

export class LocationApiService {
    private readonly statusParam: string = '?statusId=2&'

    async getCountries(params?: Partial<FindCountriesRawDTO>, active: boolean = true): Promise<FindCountriesResponseDTO> {

        let baseUrl: string = locationServiceUrl.getCountries;

        if (active) {
            baseUrl = `${baseUrl}${this.statusParam}`;
        }

        const url: string = serverUtil.buildUrlWithParams<FindCountriesRawDTO>(baseUrl, params);

        const {data} = await axios.get(url);

        if (!data.success) {
            throw new Error(errorMessages.failure.searchEntity('countries'));
        }

        return data.data;
    }

    async getStates(params?: Partial<FindStatesRawDTO>, active: boolean = true): Promise<FindStatesResponseDTO> {
        let baseUrl: string = locationServiceUrl.getStates;

        if (active) {
            baseUrl = `${baseUrl}${this.statusParam}`;
        }

        const url: string = serverUtil.buildUrlWithParams<FindStatesRawDTO>(baseUrl, params);

        const {data} = await axios.get(url);

        if (!data.success) {
            throw new Error(errorMessages.failure.searchEntity('state'));
        }

        return data.data;
    }

    async getCities(params?: Partial<FindCitiesRawDTO>, active: boolean = true): Promise<FindCitiesResponseDTO> {
        let baseUrl: string = locationServiceUrl.getCities;

        if (active) {
            baseUrl = `${baseUrl}${this.statusParam}`;
        }

        const url: string = serverUtil.buildUrlWithParams<FindCitiesRawDTO>(baseUrl, params);

        const {data} = await axios.get(url);

        if (!data.success) {
            throw new Error(errorMessages.failure.searchEntity('city'));
        }

        return data.data;
    }

}

export const locationApiService = new LocationApiService();
