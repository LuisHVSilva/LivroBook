import {IRepositoryBase} from "@coreShared/base/interfaces/IRepositoryBase";
import {CityEntity} from "@location/domain/entities/city.entity";
import {CityModel} from "@location/infrastructure/models/city.model";
import {CityFilterDTO, CityPersistenceDTO} from "@location/adapters/dtos/city.dto";
import {BaseRepositoryType} from "@coreShared/types/entity.type";

export type CityBaseRepositoryType = BaseRepositoryType<CityModel, CityEntity, CityFilterDTO, CityPersistenceDTO>;

export interface ICityRepository extends IRepositoryBase<CityBaseRepositoryType> {

}