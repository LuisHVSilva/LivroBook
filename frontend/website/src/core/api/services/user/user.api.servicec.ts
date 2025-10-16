import {BaseApiService} from "../../base/base.api.service.ts";
import {stringUtil} from "../../../utils/string.util.ts";
import type {StatusEntity} from "../../types/status.type.ts";
import {statusApiService} from "../status/status.api.service.ts";
import type {UserEntity} from "../../types/user.type.ts";
import type {CityEntity} from "../../types/city.type.ts";
import type {DocumentTypeEntity} from "../../types/document.type.ts";
import {cityApiService} from "../location/city.api.service.ts";
import {documentTypeApiService} from "../document/documentType.api.service.ts";
import type {PhoneEntity} from "../../types/phone.type.ts";
import {phoneApiService} from "../phone/phone.api.service.ts";
import type {UserTypeEntity} from "../../types/UserType.type.ts";
import {userTypeApiService} from "./userType.api.service.ts";

class UserApiService extends BaseApiService<"user", UserEntity> {
    public async preAlterConfig(): Promise<{
        city: Partial<CityEntity>[];
        documentType: Partial<DocumentTypeEntity>[];
        phone: Partial<PhoneEntity>[];
        userType: Partial<UserEntity>[];
        status: Partial<StatusEntity>[];
    }> {
        const cities: Partial<CityEntity>[] = await cityApiService.extractPropertiesList('description');
        const documentTypes: Partial<DocumentTypeEntity>[] = await documentTypeApiService.extractPropertiesList('description');
        const phones: Partial<PhoneEntity>[] = await phoneApiService.extractPropertiesList('number');
        const userTypes: Partial<UserTypeEntity>[] = await userTypeApiService.extractPropertiesList('description');
        const statuses: Partial<StatusEntity>[] = await statusApiService.extractPropertiesList('description');

        return {
            city: cities,
            documentType: documentTypes,
            phone: phones,
            userType: userTypes,
            status: statuses
        }
    }

    protected convertStringToPartialEntity(payloadString: Record<string, string>): Partial<UserEntity> {
        const partial = {
            id: stringUtil.convertStringToInt(payloadString.id),
            name: stringUtil.checkNullString(payloadString.name),
            email: stringUtil.checkNullString(payloadString.email),
            document: stringUtil.checkNullString(payloadString.document),
            birthday: payloadString.birthday,
            isTwoFactorEnable: stringUtil.convertStringToBoolean(payloadString.isTwoFactorEnable),
            isEmailVerified: stringUtil.convertStringToBoolean(payloadString.isEmailVerified),
            city: stringUtil.checkNullString(payloadString.city),
            documentType: stringUtil.checkNullString(payloadString.documentType),
            phone: stringUtil.checkNullString(payloadString.phone),
            userType: stringUtil.checkNullString(payloadString.userType),
            status: stringUtil.checkNullString(payloadString.status),
        }

        return Object.fromEntries(
            Object.entries(partial).filter(([_, value]) => value !== undefined)
        ) as Partial<UserEntity>;
    };
}

export const userApiService = new UserApiService("user");
