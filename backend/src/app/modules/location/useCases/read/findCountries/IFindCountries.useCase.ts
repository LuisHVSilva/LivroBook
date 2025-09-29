import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {FindCountriesRawDTO, FindCountriesResponseDTO} from "@location/adapters/dtos/country.dto";

export interface IFindCountriesUseCase extends IUseCase<FindCountriesRawDTO, FindCountriesResponseDTO> {
}