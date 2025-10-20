import {UserRepositoryEntity} from "./user.repository.entity.ts";
import {UserDomainEntity} from "./user.domain.entity.ts";
import {EntityServiceBase} from "../../entity.service.base.ts";
import {StatusService} from "../../status/status.service.entity.ts";
import type {StatusEntity} from "../../status/status.domain.entity.ts";
import {CityServiceEntity} from "../../location/city/city.service.entity.ts";
import {DocumentTypeServiceEntity} from "../../document/documentType/documentType.service.entity.ts";
import {PhoneServiceEntity} from "../../phone/phone/phone.service.entity.ts";
import {UserTypeServiceEntity} from "../userType/userType.service.entity.ts";
import type {UserTypeEntity} from "../userType/userType.domain.entity.ts";
import type {DocumentTypeEntity} from "../../document/documentType/documentType.domain.entity.ts";
import type {CityEntity} from "../../location/city/city.domain.entity.ts";
import type {PhoneEntity} from "../../phone/phone/phone.domain.entity.ts";


export class UserServiceEntity extends EntityServiceBase<UserDomainEntity, UserRepositoryEntity> {
    static RepositoryClass = UserRepositoryEntity;
    protected readonly DomainClass = UserDomainEntity;

    private readonly cityService:CityServiceEntity = new CityServiceEntity();
    private readonly documentTypeService: DocumentTypeServiceEntity = new DocumentTypeServiceEntity();
    private readonly phoneService: PhoneServiceEntity = new PhoneServiceEntity()
    private readonly userTypeService: UserTypeServiceEntity = new UserTypeServiceEntity();
    private readonly statusService: StatusService = new StatusService();

    public async loadReferenceData(): Promise<{
        city: Partial<CityEntity>[];
        documentType: Partial<DocumentTypeEntity>[];
        phone: Partial<PhoneEntity>[];
        userType: Partial<UserTypeEntity>[];
        status: Partial<StatusEntity>[];
    }> {
        const cities: Partial<CityEntity>[] = await this.cityService.extractPropertiesList('description');
        const documentTypes: Partial<DocumentTypeEntity>[] = await this.documentTypeService.extractPropertiesList('description');
        const phones: Partial<PhoneEntity>[] = await this.phoneService.extractPropertiesList('number');
        const userTypes: Partial<UserTypeEntity>[] = await this.userTypeService.extractPropertiesList('description');
        const statuses: Partial<StatusEntity>[] = await this.statusService.extractPropertiesList('description');

        return {
            city: cities,
            documentType: documentTypes,
            phone: phones,
            userType: userTypes,
            status: statuses
        }
    }
}