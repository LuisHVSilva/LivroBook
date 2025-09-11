import {
    CreateStatusDTO,
    FilterStatusDTO,
    UpdateStatusDTO,
    UpdateStatusResponseDTO
} from "@status/adapters/dtos/status.dto";
import {Transaction} from "sequelize";
import {UpdateResultType} from "@coreShared/types/crudResult.type";
import {StatusEntity} from "@status/domain/entities/status.entity";
import {FindAllType} from "@coreShared/types/findAll.type";
import {DeleteStatusEnum} from "@coreShared/enums/deleteStatus.enum";
import {DeleteReport} from "@coreShared/utils/operationReport.util";

export interface IStatusService {
    create(data: CreateStatusDTO, transaction: Transaction): Promise<StatusEntity>;

    getById(id: number): Promise<StatusEntity>;

    getStatusActiveById(id: number): Promise<StatusEntity>;

    getByDescription(description: string): Promise<StatusEntity | null>;

    getStausActiveByDescription(description: string): Promise<StatusEntity>;

    findMany(filter: FilterStatusDTO, page?: number, limit?: number): Promise<FindAllType<StatusEntity>>;

    getStatusForNewEntities(): Promise<StatusEntity>;

    getStatusForUpdateEntities(): Promise<StatusEntity>;

    getStatusForInactiveEntities(): Promise<StatusEntity>;

    update(newData: UpdateStatusDTO, transaction: Transaction): Promise<UpdateResultType<UpdateStatusResponseDTO>>;

    delete(id: number, transaction: Transaction): Promise<DeleteStatusEnum>;

    deleteMany(ids: number[], transaction: Transaction): Promise<DeleteReport>;
}