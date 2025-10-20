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