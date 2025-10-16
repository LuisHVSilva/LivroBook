import {statusApiService} from "../status/status.api.service.ts";
import type {StatusEntity} from "../../types/status.type.ts";
import type {CountryEntity} from "../../types/country.type.ts";
import {BaseApiService} from "../../base/base.api.service.ts";
import {stringUtil} from "../../../utils/string.util.ts";
import type {StateEntity} from "../../types/state.type.ts";
import type {CityEntity} from "../../types/city.type.ts";
import {stateApiService} from "./state.api.service.ts";

class CityApiService extends BaseApiService<"city", CityEntity> {
    public async preAlterConfig(): Promise<{
        state: Partial<CountryEntity>[];
        status: Partial<StatusEntity>[];
    }> {
        const statuses: Partial<StatusEntity>[] = await statusApiService.extractPropertiesList('description');
        const states: Partial<StateEntity>[] = await stateApiService.extractPropertiesList('description');
        return {
            status: statuses,
            state: states,
        }
    }

    protected convertStringToPartialEntity(payloadString: Record<string, string>): Partial<StateEntity> {
        const partial = {
            id: stringUtil.convertStringToInt(payloadString.id),
            description: stringUtil.checkNullString(payloadString.description),
            state: stringUtil.checkNullString(payloadString.state),
            status: stringUtil.checkNullString(payloadString.status),
        }

        return Object.fromEntries(
            Object.entries(partial).filter(([_, value]) => value !== undefined)
        ) as Partial<StateEntity>;
    };
}

export const cityApiService = new CityApiService("city");
