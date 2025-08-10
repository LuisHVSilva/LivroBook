import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {DeleteStatusDTO, DeleteStatusResponseDTO} from "@status/adapters/dtos/status.dto";
import {ResultType} from "@coreShared/types/result.type";

export interface IDeleteStatusUseCase extends IUseCase<DeleteStatusDTO, ResultType<DeleteStatusResponseDTO>>{
}