import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {DeleteLocationDTO, DeleteLocationResponseDTO} from "@location/adapters/dtos/location.dto";

export interface IDeleteLocationsUseCase extends IUseCase<DeleteLocationDTO, DeleteLocationResponseDTO> {

}