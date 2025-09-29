import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {UpdateCityDTO, UpdateCityResponseDTO} from "@location/adapters/dtos/city.dto";
import {UpdateResultType} from "@coreShared/types/crudResult.type";

export interface IUpdateCityUseCase extends IUseCase<UpdateCityDTO, UpdateResultType<UpdateCityResponseDTO>> {
}