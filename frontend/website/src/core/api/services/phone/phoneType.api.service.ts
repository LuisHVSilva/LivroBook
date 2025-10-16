import {statusApiService} from "../status/status.api.service.ts";
import type {StatusEntity} from "../../types/status.type.ts";
import {BaseApiService} from "../../base/base.api.service.ts";
import {stringUtil} from "../../../utils/string.util.ts";
import type {PhoneTypeEntity} from "../../types/phoneType.type.ts";

class PhoneTypeApiService extends BaseApiService<"phoneType", PhoneTypeEntity> {
    public async preAlterConfig(): Promise<{
        status: Partial<StatusEntity>[];
    }> {
        const statuses: Partial<StatusEntity>[] = await statusApiService.extractPropertiesList('description');
        return {
            status: statuses,
        }
    }

    protected convertStringToPartialEntity(payloadString: Record<string, string>): Partial<PhoneTypeEntity> {
        const partial = {
            id: stringUtil.convertStringToInt(payloadString.id),
            description: stringUtil.checkNullString(payloadString.description),
            status: stringUtil.checkNullString(payloadString.status),
        }

        return Object.fromEntries(
            Object.entries(partial).filter(([_, value]) => value !== undefined)
        ) as Partial<PhoneTypeEntity>;
    };
}

export const phoneTypeApiService = new PhoneTypeApiService("phoneType");
