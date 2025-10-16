import {BaseApiService} from "../../base/base.api.service.ts";
import {stringUtil} from "../../../utils/string.util.ts";
import type {StatusEntity} from "../../types/status.type.ts";
import {statusApiService} from "../status/status.api.service.ts";
import type {UserCredentialTypeEntity} from "../../types/userCredentialType.type.ts";

class UserCredentialTypeApiService  extends BaseApiService<"userCredentialType", UserCredentialTypeEntity>  {
    public async preAlterConfig(): Promise<{
        status: Partial<StatusEntity>[];
    }> {
        const statuses: Partial<StatusEntity>[] = await statusApiService.extractPropertiesList('description');

        return {
            status: statuses,
        }
    }

    protected convertStringToPartialEntity(payloadString: Record<string, string>): Partial<UserCredentialTypeEntity> {
        const partial = {
            id: stringUtil.convertStringToInt(payloadString.id),
            description: stringUtil.checkNullString(payloadString.description),
            status: stringUtil.checkNullString(payloadString.status),
        }

        return Object.fromEntries(
            Object.entries(partial).filter(([_, value]) => value !== undefined)
        ) as Partial<UserCredentialTypeEntity>;
    };
}

export const userCredentialTypeApiService = new UserCredentialTypeApiService("userCredentialType");
