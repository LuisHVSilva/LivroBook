import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {DeleteRequestDTO, DeleteResponseDTO} from "@coreShared/dtos/operation.dto";

export interface IDeleteUserTypeUseCase extends IUseCase<DeleteRequestDTO, DeleteResponseDTO> {
}