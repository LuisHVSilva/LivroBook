import {DtoBaseType} from "@coreShared/types/entity.type";
import {CityDTO, CityFilterDTO, CreateCityDTO, FindCitiesDTO, UpdateCityDTO} from "@location/adapters/dtos/city.dto";
import {IServiceBase} from "@coreShared/base/interfaces/IServiceBase";
import {CityEntity} from "@location/domain/entities/city.entity";

export type CityDtoBaseType = DtoBaseType<
    CityDTO,
    CreateCityDTO,
    FindCitiesDTO,
    UpdateCityDTO,
    CityFilterDTO
>

export interface ICityService extends IServiceBase<CityDtoBaseType, CityEntity> {
}