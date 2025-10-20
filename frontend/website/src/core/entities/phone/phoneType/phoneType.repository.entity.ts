import {EntityRepositoryBase} from "../../entity.repository.base.ts";
import {type PhoneTypeEntity} from "./phoneType.domain.entity.ts";


export class PhoneTypeRepositoryEntity extends EntityRepositoryBase<PhoneTypeEntity, "phoneType"> {
    constructor() {
        super("phoneType");
    }
}