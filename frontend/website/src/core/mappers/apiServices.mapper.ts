import {StatusService} from "../entities/status/status.service.entity.ts";
import {CountryServiceEntity} from "../entities/location/country/country.service.entity.ts";
import {StateServiceEntity} from "../entities/location/state/state.service.entity.ts";
import {DocumentTypeServiceEntity} from "../entities/document/documentType/documentType.service.entity.ts";
import {CityServiceEntity} from "../entities/location/city/city.service.entity.ts";
import {PhoneTypeServiceEntity} from "../entities/phone/phoneType/phoneType.service.entity.ts";
import {PhoneCodeServiceEntity} from "../entities/phone/phoneCode/phoneCode.service.entity.ts";
import {PhoneServiceEntity} from "../entities/phone/phone/phone.service.entity.ts";
import {UserTypeServiceEntity} from "../entities/user/userType/userType.service.entity.ts";
import {
    UserCredentialTypeServiceEntity
} from "../entities/user/userCredentialType/userCredentialType.service.entity.ts";
import {UserServiceEntity} from "../entities/user/user/user.service.entity.ts";
import {DocumentTypeDomainEntity} from "../entities/document/documentType/documentType.domain.entity.ts";
import {CountryDomainEntity} from "../entities/location/country/country.domain.entity.ts";
import {StateDomainEntity} from "../entities/location/state/state.domain.entity.ts";
import {CityDomainEntity} from "../entities/location/city/city.domain.entity.ts";
import {PhoneTypeDomainEntity} from "../entities/phone/phoneType/phoneType.domain.entity.ts";
import {PhoneCodeDomainEntity} from "../entities/phone/phoneCode/phoneCode.domain.entity.ts";
import {PhoneDomainEntity} from "../entities/phone/phone/phone.domain.entity.ts";
import {UserTypeDomainEntity} from "../entities/user/userType/userType.domain.entity.ts";
import {UserCredentialTypeDomainEntity} from "../entities/user/userCredentialType/userCredentialType.domain.entity.ts";
import {UserDomainEntity} from "../entities/user/user/user.domain.entity.ts";
import {StatusDomainEntity} from "../entities/status/status.domain.entity.ts";

export const mapApiService = (entity: string) => {
    let service = undefined;
    switch (entity) {
        case "documentType":
            service = new DocumentTypeServiceEntity();
            break;
        case "country":
            service = new CountryServiceEntity();
            break;
        case "state":
            service = new StateServiceEntity();
            break;
        case "city":
            service = new CityServiceEntity();
            break;
        case "phoneType":
            service = new PhoneTypeServiceEntity();
            break;
        case "phoneCode":
            service = new PhoneCodeServiceEntity();
            break;
        case "phone":
            service = new PhoneServiceEntity();
            break;
        case "userType":
            service = new UserTypeServiceEntity();
            break;
        case "userCredentialType":
            service = new UserCredentialTypeServiceEntity();
            break;
        case "user":
            service = new UserServiceEntity();
            break
        case "status":
            service =  new StatusService();
            break;
        default:
            break;
    }

    if (!service) {
        throw new Error(`Service '${entity}' not found.`);
    }

    return service;
}

export const mapApiEntities = (entityName: string) => {
    let entity = null;
    switch (entityName) {
        case "documentType":
            entity = DocumentTypeDomainEntity.rehydrate({});
            break;
        case "country":
            entity = CountryDomainEntity.rehydrate({});
            break;
        case "state":
            entity = StateDomainEntity.rehydrate({});
            break;
        case "city":
            entity = CityDomainEntity.rehydrate({});
            break;
        case "phoneType":
            entity = PhoneTypeDomainEntity.rehydrate({});
            break;
        case "phoneCode":
            entity = PhoneCodeDomainEntity.rehydrate({});
            break;
        case "phone":
            entity = PhoneDomainEntity.rehydrate({});
            break;
        case "userType":
            entity = UserTypeDomainEntity.rehydrate({});
            break;
        case "userCredentialType":
            entity = UserCredentialTypeDomainEntity.rehydrate({});
            break;
        case "user":
            entity = UserDomainEntity.rehydrate({});
            break
        case "status":
            entity = StatusDomainEntity.rehydrate({});
            break;
        default:
            break;
    }

    if (!entity) {
        throw new Error(`Entity '${entityName}' not found.`);
    }

    return entity;
}