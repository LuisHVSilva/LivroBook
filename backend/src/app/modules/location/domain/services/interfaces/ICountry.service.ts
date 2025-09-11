import {IServiceBase} from "@coreShared/base/interfaces/IServiceBase";
import {CountryDtoBaseType} from "@location/adapters/dtos/country.dto";
import {CountryEntity} from "@location/domain/entities/country.entity";

export interface ICountryService extends IServiceBase<CountryDtoBaseType, CountryEntity> {
}
