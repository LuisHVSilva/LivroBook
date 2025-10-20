import {EntityServiceBase} from "../../entity.service.base.ts";
import {StatusService} from "../../status/status.service.entity.ts";
import type {StatusEntity} from "../../status/status.domain.entity.ts";
import {UserCredentialTypeRepositoryEntity} from "./userCredentialType.repository.entity.ts";
import {UserCredentialTypeDomainEntity} from "./userCredentialType.domain.entity.ts";


export class UserCredentialTypeServiceEntity extends EntityServiceBase<UserCredentialTypeDomainEntity, UserCredentialTypeRepositoryEntity> {
    static RepositoryClass = UserCredentialTypeRepositoryEntity;
    protected readonly DomainClass = UserCredentialTypeDomainEntity;

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