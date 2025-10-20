import {UserTypeDomainEntity} from "./userType.domain.entity.ts";
import {EntityServiceBase} from "../../entity.service.base.ts";
import {StatusService} from "../../status/status.service.entity.ts";
import type {StatusEntity} from "../../status/status.domain.entity.ts";
import {UserTypeRepositoryEntity} from "./userType.repository.entity.ts";


export class UserTypeServiceEntity extends EntityServiceBase<UserTypeDomainEntity, UserTypeRepositoryEntity> {
    static RepositoryClass = UserTypeRepositoryEntity;
    protected readonly DomainClass = UserTypeDomainEntity;

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