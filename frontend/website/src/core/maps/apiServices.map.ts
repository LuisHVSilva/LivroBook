// // services/index.ts
// import type {BaseApiService} from "../api/base/base.api.service.ts";
// import type {AllModulesMap} from "../constants/url.constant.ts";
//
// const apiServicesMap: Record<string, BaseApiService<keyof AllModulesMap, Record<string, unknown>>> = {};
// const modules = import.meta.glob("../api/services/**/*api.service.ts", { eager: true });
//
// for (const path in modules) {
//
//     const moduleExports = modules[path] as Record<string, unknown>;
//     if (moduleExports === undefined) {
//         continue;
//     }
//
//     for (const [, exported] of Object.entries(moduleExports)) {
//         if (
//             exported &&
//             typeof exported === "object" &&
//             "alter" in exported &&
//             "getById" in exported
//         ) {
//             const key = path
//                 .replace("./", "")
//                 .replace("ApiService.ts", "")
//                 .replace("./", "")
//                 .replace("/", "")
//                 .toLowerCase();
//
//             apiServicesMap[key] = exported as BaseApiService<keyof AllModulesMap, Record<string, unknown>>;
//         }
//     }
// }
//

import {documentTypeApiService} from "../api/services/document/documentType.api.service.ts";
import {countryApiService} from "../api/services/location/country.api.service.ts";
import {stateApiService} from "../api/services/location/state.api.service.ts";
import {cityApiService} from "../api/services/location/city.api.service.ts";
import {phoneTypeApiService} from "../api/services/phone/phoneType.api.service.ts";
import {phoneCodeApiService} from "../api/services/phone/phoneCode.api.service.ts";
import {phoneApiService} from "../api/services/phone/phone.api.service.ts";
import {userTypeApiService} from "../api/services/user/userType.api.service.ts";
import {userCredentialTypeApiService} from "../api/services/user/userCredentialType.api.service.ts";
import {userApiService} from "../api/services/user/user.api.servicec.ts";

export const mapApiService = (entity: string) => {
    switch (entity) {
        case "documentType":
            return documentTypeApiService;
        case "country":
            return countryApiService;
        case "state":
            return stateApiService;
        case "city":
            return cityApiService;
        case "phoneType":
            return phoneTypeApiService;
        case "phoneCode":
            return phoneCodeApiService;
        case "phone":
            return phoneApiService;
        case "userType":
            return userTypeApiService;
        case "userCredentialType":
            return userCredentialTypeApiService;
        case "user":
            return userApiService;
        default:
            break;
    }
}