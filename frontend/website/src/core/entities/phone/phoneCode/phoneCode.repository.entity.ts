import {EntityRepositoryBase} from "../../entity.repository.base.ts";
import {type PhoneCodeEntity} from "./phoneCode.domain.entity.ts";

export class PhoneCodeRepositoryEntity extends EntityRepositoryBase<PhoneCodeEntity, "phoneCode"> {
    constructor() {
        super("phoneCode");
    }

}