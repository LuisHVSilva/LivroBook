import {StatusEntity} from "@status/domain/entities/status.entity";
import {StatusModel} from "@status/infrastructure/models/status.model";
import {FilterStatusDTO} from "@status/adapters/dtos/status.dto";
import {BaseRepositoryType} from "@coreShared/types/entity.type";
import {IRepositoryBase} from "@coreShared/base/interfaces/IRepositoryBase";
import {ResultType} from "@coreShared/types/result.type";

export type StatusPersistenceDTO = {
    description: string;
    active: boolean;
};
export type StatusBaseRepositoryType = BaseRepositoryType<StatusModel, StatusEntity, FilterStatusDTO, StatusPersistenceDTO>;

export interface IStatusRepository extends IRepositoryBase<StatusBaseRepositoryType> {
    findByDescription(description: string): Promise<ResultType<StatusEntity>>;
}