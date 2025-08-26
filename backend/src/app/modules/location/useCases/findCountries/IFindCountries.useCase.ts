import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {FindCountriesDTO, FindCountriesResponseDTO} from "@location/adapters/dtos/country.dto";

export interface IFindCountriesUseCase extends IUseCase<FindCountriesDTO, FindCountriesResponseDTO> {
}