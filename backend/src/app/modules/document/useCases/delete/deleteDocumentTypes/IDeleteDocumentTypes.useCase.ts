import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {DeleteRequestDTO, DeleteResponseDTO} from "@coreShared/dtos/operation.dto";

export interface IDeleteDocumentTypesUseCase extends IUseCase<DeleteRequestDTO, DeleteResponseDTO> {
}