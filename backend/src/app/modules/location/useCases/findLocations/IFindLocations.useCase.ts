import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {GetLocationsDTO, GetLocationsResponseDTO} from "@location/adapters/dtos/location.dto";
import {ResultType} from "@coreShared/types/result.type";

export interface IFindLocationsUseCase extends IUseCase<GetLocationsDTO, ResultType<GetLocationsResponseDTO>> {
}