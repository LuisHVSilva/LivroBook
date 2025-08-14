import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {DeleteStatusDTO, DeleteStatusResponseDTO} from "@status/adapters/dtos/status.dto";

export interface IDeleteStatusUseCase extends IUseCase<DeleteStatusDTO, DeleteStatusResponseDTO>{
}