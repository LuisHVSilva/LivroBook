import axios from "../client/http.ts";
import {errorMessages} from "../../constants/errorMessages.ts";
import {documentServiceUrl} from "../../constants/url.constant.ts";
import {serverUtil} from "../../utils/server.util.ts";
import type {FindDocumentTypesRawDTO, FindDocumentTypesResponseDTO} from "../types/document.types.ts";

export class DocumentApiService {
    private readonly statusParam: string = '?statusId=2&'

    async getDocumentType(params?: Partial<FindDocumentTypesRawDTO>, active: boolean = true): Promise<FindDocumentTypesResponseDTO> {

        let baseUrl: string = documentServiceUrl.getDocumentType;

        if (active) {
            baseUrl = `${baseUrl}${this.statusParam}`;
        }

        const url: string = serverUtil.buildUrlWithParams<FindDocumentTypesRawDTO>(baseUrl, params);

        const {data} = await axios.get(url);

        if (!data.success) {
            throw new Error(errorMessages.failure.searchEntity('documentType'));
        }

        return data.data;
    }


}

export const documentApiService = new DocumentApiService();
