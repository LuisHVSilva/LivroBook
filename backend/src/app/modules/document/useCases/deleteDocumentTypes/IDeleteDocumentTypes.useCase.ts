import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {DeleteDocumentTypesDTO, DeleteDocumentTypesResponseDTO} from "@document/adapters/dto/documentType.dto";

export interface IDeleteDocumentTypesUseCase extends IUseCase<DeleteDocumentTypesDTO, DeleteDocumentTypesResponseDTO> {
}