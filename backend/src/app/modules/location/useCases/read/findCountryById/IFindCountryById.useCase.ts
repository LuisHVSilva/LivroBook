import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {FindByIdRequestDTO} from "@coreShared/dtos/operation.dto";
import {FindByIdCountryResponseDTO} from "@location/adapters/dtos/country.dto";

export interface IFindCountryByIdUseCase extends IUseCase<FindByIdRequestDTO, FindByIdCountryResponseDTO>{

}