import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {UpdateStatusDTO} from "@status/adapters/dtos/status.dto";
import {UpdateResultType} from "@coreShared/types/crudResult.type";
import {StatusEntity} from "@status/domain/entities/status.entity";

export interface IUpdateStatusUseCase extends IUseCase<UpdateStatusDTO, UpdateResultType<StatusEntity>> {
}