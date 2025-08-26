import {CreateStateDTO, StateFilterDTO, UpdateStateDTO} from "@location/adapters/dtos/state.dto";
import {Transaction} from "sequelize";
import {UpdateResultType} from "@coreShared/types/crudResult.type";
import {StateEntity} from "@location/domain/entities/state.entity";
import {FindAllType} from "@coreShared/types/findAll.type";
import {DeleteStatusEnum} from "@coreShared/enums/deleteStatus.enum";
import {DeleteReport} from "@coreShared/utils/operationReport.util";

export interface IStateService {
    create(data: CreateStateDTO, transaction: Transaction): Promise<StateEntity>;

    getById(id: number): Promise<StateEntity>;

    findMany(filter: StateFilterDTO, page?: number, limit?: number): Promise<FindAllType<StateEntity>>;

    update(newData: UpdateStateDTO, transaction: Transaction): Promise<UpdateResultType<StateEntity>>;

    delete(id: number, transaction: Transaction): Promise<DeleteStatusEnum>;

    deleteMany(ids: number[], transaction: Transaction): Promise<DeleteReport>;
}
