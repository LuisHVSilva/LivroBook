import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {FindCitiesRawDTO, FindCitiesResponseDTO} from "@location/adapters/dtos/city.dto";

export interface IFindCitiesUseCase extends IUseCase<FindCitiesRawDTO, FindCitiesResponseDTO> {
}