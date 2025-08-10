import {IBaseRepository} from "@coreShared/interfaces/IBaseRepository";
import {StateEntity} from "@location/domain/entities/state.entity";
import {StateModel} from "@location/infrastructure/models/state.model";
import {StateFilterDTO} from "@location/adapters/dtos/state.dto";

export interface IStateRepository extends IBaseRepository<StateEntity, StateModel, StateFilterDTO> {
}