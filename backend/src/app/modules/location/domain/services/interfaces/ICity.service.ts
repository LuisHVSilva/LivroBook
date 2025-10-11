import {IServiceBase} from "@coreShared/base/interfaces/IServiceBase";
import {CityEntity} from "@location/domain/entities/city.entity";
import {CityDtoBaseType} from "@location/adapters/dtos/city.dto";

export interface ICityService extends IServiceBase<CityDtoBaseType, CityEntity> {
}