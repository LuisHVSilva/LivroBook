import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {UpdateStateDTO} from "@location/adapters/dtos/state.dto";
import {UpdateResultType} from "@coreShared/types/crudResult.type";
import {StateEntity} from "@location/domain/entities/state.entity";

export interface IUpdateStateUseCase extends IUseCase<UpdateStateDTO, UpdateResultType<StateEntity>> {
}