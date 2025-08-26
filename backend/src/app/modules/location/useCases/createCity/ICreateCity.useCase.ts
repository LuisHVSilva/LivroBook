import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {CreateCityDTO, CreateCityResponseDTO} from "@location/adapters/dtos/city.dto";

export interface ICreateCityUseCase extends IUseCase<CreateCityDTO, CreateCityResponseDTO> {
}