import {IRepositoryBase} from "@coreShared/base/interfaces/IRepositoryBase";
import {CountryModel} from "@location/infrastructure/models/country.model";
import {CountryEntity} from "@location/domain/entities/country.entity";
import {CountryFilterDTO, CountryPersistenceDTO} from "@location/adapters/dtos/country.dto";
import {BaseRepositoryType} from "@coreShared/types/entity.type";

export type CountryBaseRepositoryType = BaseRepositoryType<CountryModel, CountryEntity, CountryFilterDTO, CountryPersistenceDTO>;

export interface ICountryRepository extends IRepositoryBase<CountryBaseRepositoryType> {
}