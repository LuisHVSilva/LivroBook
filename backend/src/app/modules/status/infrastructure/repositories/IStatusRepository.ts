import {StatusEntity} from "@status/domain/entities/status.entity";
import {IBaseRepository} from "@coreShared/interfaces/IBaseRepository";
import {ResultType} from "@coreShared/types/result.type";
import {FindFilterStatusDTO} from "@status/adapters/dtos/status.dto";
import {StatusModel} from "@status/infrastructure/models/status.model";

export interface IStatusRepository extends IBaseRepository<StatusEntity, StatusModel, FindFilterStatusDTO> {
    /**
     * Search for a status by its description.
     *
     * @param description - The description of the status to be searched for.
     * @returns A status object if found.
     */
    findByDescription(description: string): Promise<ResultType<StatusEntity>>;

}