import {IRepositoryBase} from "@coreShared/base/interfaces/IRepositoryBase";
import {StateEntity} from "@location/domain/entities/state.entity";
import {StateModel} from "@location/infrastructure/models/state.model";
import {StateFilterDTO, StatePersistenceDTO} from "@location/adapters/dtos/state.dto";
import {BaseRepositoryType} from "@coreShared/types/entity.type";

export type StateBaseRepositoryType = BaseRepositoryType<StateModel, StateEntity, StateFilterDTO, StatePersistenceDTO>

export interface IStateRepository extends IRepositoryBase<StateBaseRepositoryType> {
}