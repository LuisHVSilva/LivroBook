import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {UpdateStatusDTO, UpdateStatusResponseDTO} from "@status/adapters/dtos/status.dto";
import {UpdateResultType} from "@coreShared/types/crudResult.type";

export interface IUpdateStatusUseCase extends IUseCase<UpdateStatusDTO, UpdateResultType<UpdateStatusResponseDTO>> {
}