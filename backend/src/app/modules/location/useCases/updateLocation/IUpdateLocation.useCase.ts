import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {UpdateLocationDTO, UpdateLocationResponseDTO} from "@location/adapters/dtos/location.dto";

export interface IUpdateLocationUseCase extends IUseCase<UpdateLocationDTO, UpdateLocationResponseDTO> {

}