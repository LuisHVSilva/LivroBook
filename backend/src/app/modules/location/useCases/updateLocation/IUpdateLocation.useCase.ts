import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {UpdateLocationDTO, UpdateLocationResponseDTO} from "@location/adapters/dtos/location.dto";
import {ResultType} from "@coreShared/types/result.type";

export interface IUpdateLocationUseCase extends IUseCase<UpdateLocationDTO, ResultType<UpdateLocationResponseDTO>> {

}