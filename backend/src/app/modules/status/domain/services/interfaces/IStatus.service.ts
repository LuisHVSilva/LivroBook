import {CreateStatusDTO, FindFilterStatusDTO, UpdateStatusDTO} from "@status/adapters/dtos/status.dto";
import {Transaction} from "sequelize";
import {CreateResultType} from "@coreShared/types/crudResult.type";
import {StatusEntity} from "@status/domain/entities/status.entity";
import {FindAllType} from "@coreShared/types/findAll.type";

export interface IStatusService {
     create(data: CreateStatusDTO, transaction: Transaction): Promise<CreateResultType<StatusEntity>>;
     get(filter: FindFilterStatusDTO): Promise<StatusEntity | null>;
     getById(id: number): Promise<StatusEntity | null>;
     getStatusActiveById(id: number): Promise<StatusEntity>;
     findByDescription(description: string): Promise<StatusEntity | null>;
     findStausActiveByDescription(description: string): Promise<StatusEntity>;
     findAll(filter: FindFilterStatusDTO, page?: number, limit?: number): Promise<FindAllType<StatusEntity>>;
     delete(id: number[], transaction: Transaction): Promise<void>;
     update(newData: UpdateStatusDTO, transaction: Transaction): Promise<StatusEntity>;
     getStatusForNewEntities(): Promise<StatusEntity>;
     getStatusForUpdateEntities(): Promise<StatusEntity>;
     getStatusForInactiveEntities(): Promise<StatusEntity>;
}