import {StateCreateDTO, StateDTO, StateFilterDTO} from "@location/adapters/dtos/state.dto";
import {Transaction} from "sequelize";
import {CreateResultType, UpdateResultType} from "@coreShared/types/crudResult.type";
import {StateEntity} from "@location/domain/entities/state.entity";
import {FindAllType} from "@coreShared/types/findAll.type";

export interface IStateService {
    createOrGetState(data: StateCreateDTO, transaction: Transaction): Promise<CreateResultType<StateEntity>>;
    get(filter: StateFilterDTO): Promise<StateEntity | null>;
    getById(id: number): Promise<StateEntity | null>;
    getAll(filter: StateFilterDTO, page?: number, limit?: number): Promise<FindAllType<StateEntity>>;
    updateProperties(currentState: StateEntity, properties: StateDTO, transaction: Transaction): Promise<UpdateResultType<StateEntity>>;
    deleteState(id: number, transaction: Transaction): Promise<void>;
}
