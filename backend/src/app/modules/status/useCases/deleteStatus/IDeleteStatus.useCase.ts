import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {DeleteRequestDTO, DeleteResponseDTO} from "@coreShared/dtos/operation.dto";

export interface IDeleteStatusUseCase extends IUseCase<DeleteRequestDTO, DeleteResponseDTO>{
}