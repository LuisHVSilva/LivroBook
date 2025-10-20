import {EntityRepositoryBase} from "../../entity.repository.base.ts";
import {type StateEntity} from "./state.domain.entity.ts";

export class StateRepositoryEntity extends EntityRepositoryBase<StateEntity, "state"> {
    constructor() {
        super("state");
    }
}