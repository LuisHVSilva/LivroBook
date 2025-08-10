import {IBaseRepository} from "@coreShared/interfaces/IBaseRepository";
import {CityEntity} from "@location/domain/entities/city.entity";
import {CityModel} from "@location/infrastructure/models/city.model";
import {CityFilterDTO} from "@location/adapters/dtos/city.dto";

export interface ICityRepository extends IBaseRepository<CityEntity, CityModel, CityFilterDTO> {
}