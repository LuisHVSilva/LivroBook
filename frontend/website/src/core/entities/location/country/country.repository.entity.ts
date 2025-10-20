import {type CountryEntity} from "./country.domain.entity.ts";
import {EntityRepositoryBase} from "../../entity.repository.base.ts";

export class CountryRepositoryEntity extends EntityRepositoryBase<CountryEntity, "country"> {
    constructor() {
        super("country");
    }
}