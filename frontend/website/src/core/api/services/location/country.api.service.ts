import {BaseApiService} from "../../base/base.api.service.ts";
import type {CountryEntity} from "../../types/country.type.ts";
import {stringUtil} from "../../../utils/string.util.ts";
import type {StatusEntity} from "../../types/status.type.ts";
import {statusApiService} from "../status/status.api.service.ts";

class CountryApiService  extends BaseApiService<"country", CountryEntity>  {
    public async preAlterConfig(): Promise<{
        status: Partial<StatusEntity>[];
    }> {
        const statuses: Partial<StatusEntity>[] = await statusApiService.extractPropertiesList('description');

        return {
            status: statuses,
        }
    }

    protected convertStringToPartialEntity(payloadString: Record<string, string>): Partial<CountryEntity> {
        const partial = {
            id: stringUtil.convertStringToInt(payloadString.id),
            description: stringUtil.checkNullString(payloadString.description),
            status: stringUtil.checkNullString(payloadString.status),
        }

        return Object.fromEntries(
            Object.entries(partial).filter(([_, value]) => value !== undefined)
        ) as Partial<CountryEntity>;
    };
}

export const countryApiService = new CountryApiService("country");
