import {EntityRepositoryBase} from "../../entity.repository.base.ts";
import type {UserTypeEntity} from "./userType.domain.entity.ts";

export class UserTypeRepositoryEntity extends EntityRepositoryBase<UserTypeEntity, "userType"> {
    constructor() {
        super("userType");
    }
}