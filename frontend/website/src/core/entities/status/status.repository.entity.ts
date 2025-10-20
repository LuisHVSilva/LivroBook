import {EntityRepositoryBase} from "../entity.repository.base.ts";
import type {StatusEntity} from "./status.domain.entity.ts";

export class StatusRepositoryEntity extends EntityRepositoryBase<StatusEntity, "status"> {
    constructor() {
        super("status");
    }
}