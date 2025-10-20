import {EntityServiceBase} from "../entity.service.base.ts";
import {StatusDomainEntity} from "./status.domain.entity.ts";
import {StatusRepositoryEntity} from "./status.repository.entity.ts";

export class StatusService extends EntityServiceBase<StatusDomainEntity, StatusRepositoryEntity> {
    static RepositoryClass = StatusRepositoryEntity;
    protected readonly DomainClass = StatusDomainEntity;

    public async loadReferenceData(): Promise<Record<string, unknown>> {
        return {}
    }
}
