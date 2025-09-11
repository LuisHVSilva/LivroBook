import {StatusEntity} from "@status/domain/entities/status.entity";
import {IRepositoryBase} from "@coreShared/base/interfaces/IRepositoryBase";
import {ResultType} from "@coreShared/types/result.type";
import {StatusBaseRepositoryType} from "@status/adapters/dtos/status.dto";

export interface IStatusRepository extends IRepositoryBase<StatusBaseRepositoryType> {
    findByDescription(description: string): Promise<ResultType<StatusEntity>>;
}