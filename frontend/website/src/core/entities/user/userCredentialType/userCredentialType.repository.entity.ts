import {EntityRepositoryBase} from "../../entity.repository.base.ts";
import type {UserCredentialTypeEntity} from "./userCredentialType.domain.entity.ts";

export class UserCredentialTypeRepositoryEntity extends EntityRepositoryBase<UserCredentialTypeEntity, "userCredentialType"> {
    constructor() {
        super("userCredentialType");
    }
}