import type {StatusEntity} from "../../types/status.type.ts";
import {BaseApiService} from "../../base/base.api.service.ts";
import {stringUtil} from "../../../utils/string.util.ts";

class StatusApiService extends BaseApiService<"status", StatusEntity> {
    public async preAlterConfig(): Promise<Record<string, unknown>> {
        return {};
    }

    protected convertStringToPartialEntity(payloadString: Record<string, string>): Partial<StatusEntity> {
        const partial = {
            id: stringUtil.convertStringToInt(payloadString.id),
            description: stringUtil.checkNullString(payloadString.description),
            active: stringUtil.checkNullString(payloadString.active),
        }

        return Object.fromEntries(
            Object.entries(partial).filter(([_, value]) => value !== undefined)
        ) as Partial<StatusEntity>;
    };
}

export const statusApiService = new StatusApiService("status");
