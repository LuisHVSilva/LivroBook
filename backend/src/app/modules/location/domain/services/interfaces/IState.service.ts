import {DtoBaseType} from "@coreShared/types/entity.type";
import {
    CreateStateDTO,
    FindStatesDTO,
    StateDTO,
    StateFilterDTO,
    UpdateStateDTO
} from "@location/adapters/dtos/state.dto";
import {IServiceBase} from "@coreShared/base/interfaces/IServiceBase";
import {StateEntity} from "@location/domain/entities/state.entity";

export type StateDtoBaseType = DtoBaseType<
    StateDTO,
    CreateStateDTO,
    FindStatesDTO,
    UpdateStateDTO,
    StateFilterDTO
>

export interface IStateService extends IServiceBase<StateDtoBaseType, StateEntity> {

}
