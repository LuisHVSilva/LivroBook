import {CountryRepositoryEntity} from "./country.repository.entity.ts";
import {EntityServiceBase} from "../../entity.service.base.ts";
import {CountryDomainEntity} from "./country.domain.entity.ts";
import {type StatusEntity} from "../../status/status.domain.entity.ts";
import {StatusService} from "../../status/status.service.entity.ts";

export class CountryServiceEntity extends EntityServiceBase<CountryDomainEntity, CountryRepositoryEntity> {
    static RepositoryClass = CountryRepositoryEntity;
    protected readonly DomainClass = CountryDomainEntity;

    private readonly statusService: StatusService = new StatusService();

    public async loadReferenceData(): Promise<{
        status: Partial<StatusEntity>[];
    }> {
        const statuses = await this.statusService.extractPropertiesList("description");

        return {
            status: statuses,
        }
    }
}