import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {FindByIdRequestDTO} from "@coreShared/dtos/operation.dto";
import {FindByIdCityResponseDto} from "@location/adapters/dtos/city.dto";

export interface IFindCityByIdUseCase extends IUseCase<FindByIdRequestDTO, FindByIdCityResponseDto>{

}