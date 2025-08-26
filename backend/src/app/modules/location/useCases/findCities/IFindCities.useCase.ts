import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {FindCitiesDTO, FindCitiesResponseDTO} from "@location/adapters/dtos/city.dto";

export interface IFindCitiesUseCase extends IUseCase<FindCitiesDTO, FindCitiesResponseDTO> {
}