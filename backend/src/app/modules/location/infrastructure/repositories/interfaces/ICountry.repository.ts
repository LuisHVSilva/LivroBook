import {IBaseRepository} from "@coreShared/interfaces/IBaseRepository";
import {CountryModel} from "@location/infrastructure/models/country.model";
import {CountryEntity} from "@location/domain/entities/country.entity";
import {CountryFilterDTO} from "@location/adapters/dtos/country.dto";

export interface ICountryRepository extends IBaseRepository<CountryEntity, CountryModel, CountryFilterDTO> {
}