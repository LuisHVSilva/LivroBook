import {EntityServiceBase} from "../../entity.service.base.ts";
import type {StatusEntity} from "../../status/status.domain.entity.ts";
import {StatusService} from "../../status/status.service.entity.ts";
import {DocumentTypeDomainEntity} from "./documentType.domain.entity.ts";
import {DocumentTypeRepositoryEntity} from "./documentType.repository.entity.ts";
import {CountryServiceEntity} from "../../location/country/country.service.entity.ts";
import type {CountryEntity} from "../../location/country/country.domain.entity.ts";


export class DocumentTypeServiceEntity extends EntityServiceBase<DocumentTypeDomainEntity, DocumentTypeRepositoryEntity> {
    static RepositoryClass = DocumentTypeRepositoryEntity;
    protected readonly DomainClass = DocumentTypeDomainEntity;

    private readonly statusService: StatusService = new StatusService();
    private readonly countryService: CountryServiceEntity = new CountryServiceEntity();

    public async loadReferenceData(): Promise<{
        country: Partial<CountryEntity>[];
        status: Partial<StatusEntity>[];
    }> {
        const statuses: Partial<StatusEntity>[] = await this.statusService.extractPropertiesList('description');
        const states: Partial<CountryEntity>[] = await this.countryService.extractPropertiesList('description');

        return {
            country: states,
            status: statuses,
        }
    }
}