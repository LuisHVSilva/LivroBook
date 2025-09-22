import axios from "../client/http.ts";
import {errorMessages} from "../../constants/errorMessages.ts";
import {phoneServiceUrl} from "../../constants/url.constant.ts";
import {serverUtil} from "../../utils/server.util.ts";
import type {
    FindPhoneCodesRawDTO,
    FindPhoneCodesResponseDTO,
    FindPhoneTypesRawDTO,
    FindPhoneTypesResponseDTO
} from "../types/phone.types.ts";

export class PhoneApiService {
    private readonly statusParam: string = '?statusId=2&'

    async getPhoneTypes(params?: Partial<FindPhoneTypesRawDTO>, active: boolean = true): Promise<FindPhoneTypesResponseDTO> {
        let baseUrl: string = phoneServiceUrl.getPhoneType;

        if (active) {
            baseUrl = `${baseUrl}${this.statusParam}`;
        }

        const url: string = serverUtil.buildUrlWithParams<FindPhoneTypesRawDTO>(baseUrl, params);

        const {data} = await axios.get(url);

        if (!data.success) {
            throw new Error(errorMessages.failure.searchEntity('phoneType'));
        }

        return data.data;
    }

    async getPhoneCodes(params?: Partial<FindPhoneCodesRawDTO>, active: boolean = true): Promise<FindPhoneCodesResponseDTO> {
        let baseUrl: string = phoneServiceUrl.getPhoneCode;
        if (active) {
            baseUrl = `${baseUrl}${this.statusParam}`;
        }

        const url: string = serverUtil.buildUrlWithParams<FindPhoneCodesRawDTO>(baseUrl, params);

        const {data} = await axios.get(url);

        if (!data.success) {
            throw new Error(errorMessages.failure.searchEntity('phoneCodes'));
        }

        return data.data;
    }


}

export const phoneApiService = new PhoneApiService();
