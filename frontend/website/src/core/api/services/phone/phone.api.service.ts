import {statusApiService} from "../status/status.api.service.ts";
import type {StatusEntity} from "../../types/status.type.ts";
import {BaseApiService} from "../../base/base.api.service.ts";
import {stringUtil} from "../../../utils/string.util.ts";
import type {PhoneCodeEntity} from "../../types/phoneCode.type.ts";
import type {PhoneEntity} from "../../types/phone.type.ts";
import type {PhoneTypeEntity} from "../../types/phoneType.type.ts";
import {phoneTypeApiService} from "./phoneType.api.service.ts";
import {phoneCodeApiService} from "./phoneCode.api.service.ts";

class PhoneApiService extends BaseApiService<"phone", PhoneEntity> {
    public async preAlterConfig(): Promise<{
        phoneType: Partial<PhoneTypeEntity>[];
        status: Partial<StatusEntity>[];
        ddiCode: { ddiCode: number | undefined }[];
        dddCode: { dddCode: number | undefined }[];
    }> {

        const phoneTypes: Partial<PhoneTypeEntity>[] = await phoneTypeApiService.extractPropertiesList('description');
        const statuses: Partial<StatusEntity>[] = await statusApiService.extractPropertiesList('description');

        return {
            phoneType: phoneTypes,
            status: statuses,
            ...(await this.extractDddCodeAndDdiCodeList())
        }
    }

    public async extractDddCodeAndDdiCodeList(): Promise<{
        ddiCode: { ddiCode: number | undefined }[];
        dddCode: { dddCode: number | undefined }[];
    }> {
        const phoneCodes: Partial<PhoneCodeEntity>[] = await phoneCodeApiService.extractPropertiesList(['ddiCode', 'dddCode']);

        const dddiCodesSet = new Set<number | undefined>();
        const ddiCodes = phoneCodes.reduce((acc, item) => {
            if (!dddiCodesSet.has(item.ddiCode)) {
                dddiCodesSet.add(item.ddiCode);
                acc.push({ ddiCode: item.ddiCode });
            }
            return acc;
        }, [] as { ddiCode: number | undefined }[]);

        const dddCodesSet = new Set<number | undefined>();
        const dddCodes = phoneCodes.reduce((acc, item) => {
            if (!dddCodesSet.has(item.dddCode)) {
                dddCodesSet.add(item.dddCode);
                acc.push({ dddCode: item.dddCode });
            }
            return acc;
        }, [] as { dddCode: number | undefined }[]);

        return {
            ddiCode: ddiCodes,
            dddCode: dddCodes
        }
    }

    protected convertStringToPartialEntity(payloadString: Record<string, string>): Partial<PhoneEntity> {
        const partial: Partial<PhoneEntity> = {
            id: stringUtil.convertStringToInt(payloadString.id),
            number: stringUtil.checkNullString(payloadString.number),
            phoneType: stringUtil.checkNullString(payloadString.phoneType),
            status: stringUtil.checkNullString(payloadString.status),
        }

        if (payloadString.ddiCode || payloadString.dddCode) {
            const phoneCode: Partial<PhoneEntity["phoneCode"]> = {};

            if (payloadString.ddiCode) {
                phoneCode.ddiCode = stringUtil.convertStringToInt(payloadString.ddiCode);
            }

            if (payloadString.dddCode) {
                phoneCode.dddCode = stringUtil.convertStringToInt(payloadString.dddCode);
            }

            if (Object.keys(phoneCode).length > 0) {
                partial.phoneCode = phoneCode as PhoneEntity["phoneCode"];
            }
        }

        return Object.fromEntries(
            Object.entries(partial).filter(([_, value]) => value !== undefined)
        ) as Partial<PhoneEntity>;
    };
}

export const phoneApiService = new PhoneApiService("phone");
