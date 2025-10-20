import {EntityServiceBase} from "../../entity.service.base.ts";
import type {StatusEntity} from "../../status/status.domain.entity.ts";
import {StatusService} from "../../status/status.service.entity.ts";
import {PhoneTypeRepositoryEntity} from "./phoneType.repository.entity.ts";
import {PhoneTypeDomainEntity} from "./phoneType.domain.entity.ts";

export class PhoneTypeServiceEntity extends EntityServiceBase<PhoneTypeDomainEntity, PhoneTypeRepositoryEntity> {
    static RepositoryClass = PhoneTypeRepositoryEntity;
    protected readonly DomainClass = PhoneTypeDomainEntity;

    private readonly statusService: StatusService = new StatusService();

    public async loadReferenceData(): Promise<{
        status: Partial<StatusEntity>[];
    }> {
        const statuses: Partial<StatusEntity>[] = await this.statusService.extractPropertiesList('description');
        return {
            status: statuses,
        }
    }
}