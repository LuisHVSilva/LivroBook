import { container } from "tsyringe";
import {EntitiesNamesEnum} from "@coreShared/enums/entitiesNamesEnum";
import {IRepositoryBase} from "@coreShared/base/interfaces/IRepositoryBase";
import {DocumentTypeRepository} from "@document/infrastructure/repositories/documentType.repository";
import {CityRepository} from "@location/infrastructure/repositories/city.repository";
import {StateRepository} from "@location/infrastructure/repositories/state.repository";
import {CountryRepository} from "@location/infrastructure/repositories/country.repository";
import {PhoneRepository} from "@phone/infrastructure/repositories/phone.repository";
import {PhoneCodeRepository} from "@phone/infrastructure/repositories/phoneCode.repository";
import {PhoneTypeRepository} from "@phone/infrastructure/repositories/phoneType.repository";
import {StatusRepository} from "@status/infrastructure/repositories/status.repository";
import {UserRepository} from "@user/infrastructure/repositories/user.repository";
import {UserCredentialRepository} from "@user/infrastructure/repositories/userCredential.repository";
import {UserCredentialTypeRepository} from "@user/infrastructure/repositories/userCredentialType.repository";
import {UserTypeRepository} from "@user/infrastructure/repositories/userType.repository";


const repositoryMap: Record<EntitiesNamesEnum, () => IRepositoryBase<any>> = {
    [EntitiesNamesEnum.DocumentType]: () => container.resolve(DocumentTypeRepository),
    [EntitiesNamesEnum.City]: () => container.resolve(CityRepository),
    [EntitiesNamesEnum.State]: () => container.resolve(StateRepository),
    [EntitiesNamesEnum.Country]: () => container.resolve(CountryRepository),
    [EntitiesNamesEnum.Phone]: () => container.resolve(PhoneRepository),
    [EntitiesNamesEnum.PhoneCode]: () => container.resolve(PhoneCodeRepository),
    [EntitiesNamesEnum.PhoneType]: () => container.resolve(PhoneTypeRepository),
    [EntitiesNamesEnum.Status]: () => container.resolve(StatusRepository),
    [EntitiesNamesEnum.User]: () => container.resolve(UserRepository),
    [EntitiesNamesEnum.UserCredential]: () => container.resolve(UserCredentialRepository),
    [EntitiesNamesEnum.UserCredentialType]: () => container.resolve(UserCredentialTypeRepository),
    [EntitiesNamesEnum.UserType]: () => container.resolve(UserTypeRepository),
};

export class RepositoryFactory {
    static getRepository(modelName: EntitiesNamesEnum): IRepositoryBase<any> | null {
        const repoFactory = repositoryMap[modelName];
        return repoFactory ? repoFactory() : null;
    }
}
