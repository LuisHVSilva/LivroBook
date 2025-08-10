import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {DeleteLocationDTO, DeleteLocationResponseDTO} from "@location/adapters/dtos/location.dto";
import {ResultType} from "@coreShared/types/result.type";

export interface IDeleteLocationsUseCase extends IUseCase<DeleteLocationDTO, ResultType<DeleteLocationResponseDTO>> {

}