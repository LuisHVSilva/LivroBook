import {EntityServiceBase} from "../../entity.service.base.ts";
import type {StatusEntity} from "../../status/status.domain.entity.ts";
import {StatusService} from "../../status/status.service.entity.ts";
import {CityDomainEntity} from "./city.domain.entity.ts";
import {CityRepositoryEntity} from "./city.repository.entity.ts";
import {StateServiceEntity} from "../state/state.service.entity.ts";
import type {StateEntity} from "../state/state.domain.entity.ts";

export class CityServiceEntity extends EntityServiceBase<CityDomainEntity, CityRepositoryEntity> {
    static RepositoryClass = CityRepositoryEntity;
    protected readonly DomainClass = CityDomainEntity;

    private readonly statusService: StatusService = new StatusService();
    private readonly stateService: StateServiceEntity = new StateServiceEntity();

    public async loadReferenceData(): Promise<{
        state: Partial<StateEntity>[];
        status: Partial<StatusEntity>[];
    }> {
        const statuses: Partial<StatusEntity>[] = await this.statusService.extractPropertiesList('description');
        const states: Partial<StateEntity>[] = await this.stateService.extractPropertiesList('description');
        return {
            status: statuses,
            state: states,
        }
    }
}