import {statusApiService} from "../status/status.api.service.ts";
import type {StatusEntity} from "../../types/status.type.ts";
import {BaseApiService} from "../../base/base.api.service.ts";
import {stringUtil} from "../../../utils/string.util.ts";
import type {PhoneCodeEntity} from "../../types/phoneCode.type.ts";
import type {StateEntity} from "../../types/state.type.ts";
import {stateApiService} from "../location/state.api.service.ts";

class PhoneCodeApiService extends BaseApiService<"phoneCode", PhoneCodeEntity> {
    public async preAlterConfig(): Promise<{
        state: Partial<StateEntity>[];
        status: Partial<StatusEntity>[];
    }> {
        const states: Partial<StateEntity>[] = await stateApiService.extractPropertiesList('description');
        const statuses: Partial<StatusEntity>[] = await statusApiService.extractPropertiesList('description');
        return {
            state: states,
            status: statuses,
        }
    }

    protected convertStringToPartialEntity(payloadString: Record<string, string>): Partial<PhoneCodeEntity> {
        const partial: Partial<PhoneCodeEntity> = {
            id: stringUtil.convertStringToInt(payloadString.id),
            ddiCode: stringUtil.convertStringToInt(payloadString.ddiCode),
            dddCode: stringUtil.convertStringToInt(payloadString.dddCode),
            state: stringUtil.checkNullString(payloadString.state),
            status: stringUtil.checkNullString(payloadString.status),
        }

        return Object.fromEntries(
            Object.entries(partial).filter(([_, value]) => value !== undefined)
        ) as Partial<PhoneCodeEntity>;
    };
}

export const phoneCodeApiService = new PhoneCodeApiService("phoneCode");
