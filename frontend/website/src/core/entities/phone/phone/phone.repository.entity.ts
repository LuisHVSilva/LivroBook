import {EntityRepositoryBase} from "../../entity.repository.base.ts";
import {type PhoneEntity} from "./phone.domain.entity.ts";

export class PhoneRepositoryEntity extends EntityRepositoryBase<PhoneEntity, "phone"> {
    constructor() {
        super("phone");
    }

}