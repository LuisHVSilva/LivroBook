import {EntityServiceBase} from "../../entity.service.base.ts";
import type {StatusEntity} from "../../status/status.domain.entity.ts";
import {StatusService} from "../../status/status.service.entity.ts";
import {StateDomainEntity, type StateEntity} from "./state.domain.entity.ts";
import {StateRepositoryEntity} from "./state.repository.entity.ts";
import {CountryServiceEntity} from "../country/country.service.entity.ts";

export class StateServiceEntity extends EntityServiceBase<StateDomainEntity, StateRepositoryEntity> {
    static RepositoryClass = StateRepositoryEntity;
    protected readonly DomainClass = StateDomainEntity;

    private readonly statusService: StatusService = new StatusService();
    private readonly countryService: CountryServiceEntity = new CountryServiceEntity();

    public async loadReferenceData(): Promise<{
        country: Partial<StateEntity>[];
        status: Partial<StatusEntity>[];
    }> {
        const statuses: Partial<StatusEntity>[] = await this.statusService.extractPropertiesList('description');
        const countries: Partial<StateEntity>[] = await this.countryService.extractPropertiesList('description');
        return {
            status: statuses,
            country: countries,
        }
    }
}