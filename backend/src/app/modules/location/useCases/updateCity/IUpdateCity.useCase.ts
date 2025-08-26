import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {UpdateCityDTO} from "@location/adapters/dtos/city.dto";
import {UpdateResultType} from "@coreShared/types/crudResult.type";
import {CityEntity} from "@location/domain/entities/city.entity";

export interface IUpdateCityUseCase extends IUseCase<UpdateCityDTO, UpdateResultType<CityEntity>> {
}