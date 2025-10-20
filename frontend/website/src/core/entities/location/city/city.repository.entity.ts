import {EntityRepositoryBase} from "../../entity.repository.base.ts";
import type {CityEntity} from "./city.domain.entity.ts";

export class CityRepositoryEntity extends EntityRepositoryBase<CityEntity, "city"> {
    constructor() {
        super("city");
    }
}