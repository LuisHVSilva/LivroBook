import {DtoBaseType} from "@coreShared/types/entity.type";
import {
    CountryDTO,
    CountryFilterDTO,
    CreateCountryDTO,
    FindCountriesDTO,
    UpdateCountryDTO
} from "@location/adapters/dtos/country.dto";
import {IServiceBase} from "@coreShared/base/interfaces/IServiceBase";
import {CountryEntity} from "@location/domain/entities/country.entity";

export type CountryDtoBaseType = DtoBaseType<
    CountryDTO,
    CreateCountryDTO,
    FindCountriesDTO,
    UpdateCountryDTO,
    CountryFilterDTO
>

export interface ICountryService extends IServiceBase<CountryDtoBaseType, CountryEntity> {
}
