import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {CreateCountryDTO, CreateCountryResponseDTO} from "@location/adapters/dtos/country.dto";

export interface ICreateCountryUseCase extends IUseCase<CreateCountryDTO, CreateCountryResponseDTO> {

}