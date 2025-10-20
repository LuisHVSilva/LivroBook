import {EntityRepositoryBase} from "../../entity.repository.base.ts";
import type {UserDomainEntity} from "./user.domain.entity.ts";


export class UserRepositoryEntity extends EntityRepositoryBase<UserDomainEntity, "user"> {
    constructor() {
        super("user");
    }
}