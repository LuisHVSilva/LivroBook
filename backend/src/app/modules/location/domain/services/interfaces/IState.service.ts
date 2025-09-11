import {IServiceBase} from "@coreShared/base/interfaces/IServiceBase";
import {StateEntity} from "@location/domain/entities/state.entity";
import {StateDtoBaseType} from "@location/adapters/dtos/state.dto";



export interface IStateService extends IServiceBase<StateDtoBaseType, StateEntity> {

}
