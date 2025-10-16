import {statusApiService} from "../status/status.api.service.ts";
import type {StatusEntity} from "../../types/status.type.ts";
import type {DocumentTypeEntity} from "../../types/document.type.ts";
import type {CountryEntity} from "../../types/country.type.ts";
import {countryApiService} from "../location/country.api.service.ts";
import {BaseApiService} from "../../base/base.api.service.ts";
import {stringUtil} from "../../../utils/string.util.ts";

class DocumentTypeApiService extends BaseApiService<"documentType", DocumentTypeEntity> {
    public async preAlterConfig(): Promise<{
        country: Partial<CountryEntity>[];
        status: Partial<StatusEntity>[];
    }> {
        const statuses: Partial<StatusEntity>[] = await statusApiService.extractPropertiesList('description');
        const countries: Partial<CountryEntity>[] = await countryApiService.extractPropertiesList('description');
        return {
            status: statuses,
            country: countries,
        }
    }

    protected convertStringToPartialEntity(payloadString: Record<string, string>): Partial<DocumentTypeEntity> {
        const partial = {
            id: stringUtil.convertStringToInt(payloadString.id),
            description: stringUtil.checkNullString(payloadString.description),
            country: stringUtil.checkNullString(payloadString.country),
            status: stringUtil.checkNullString(payloadString.status),
        }

        return Object.fromEntries(
            Object.entries(partial).filter(([_, value]) => value !== undefined)
        ) as Partial<DocumentTypeEntity>;
    };
}

export const documentTypeApiService = new DocumentTypeApiService("documentType");
