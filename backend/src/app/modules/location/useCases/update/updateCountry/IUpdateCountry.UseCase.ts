import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {UpdateCountryDTO, UpdateCountryResponseDTO} from "@location/adapters/dtos/country.dto";
import {UpdateResultType} from "@coreShared/types/crudResult.type";

export interface IUpdateCountryUseCase extends IUseCase<UpdateCountryDTO, UpdateResultType<UpdateCountryResponseDTO>> {
}