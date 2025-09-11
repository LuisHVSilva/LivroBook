import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {UpdateStateDTO, UpdateStateResponseDTO} from "@location/adapters/dtos/state.dto";
import {UpdateResultType} from "@coreShared/types/crudResult.type";

export interface IUpdateStateUseCase extends IUseCase<UpdateStateDTO, UpdateResultType<UpdateStateResponseDTO>> {
}