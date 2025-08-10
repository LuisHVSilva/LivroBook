import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {DeleteDocumentTypesDTO, DeleteDocumentTypesResponseDTO} from "@document/adapters/dto/documentType.dto";
import {ResultType} from "@coreShared/types/result.type";

export interface IDeleteDocumentTypesUseCase extends IUseCase<DeleteDocumentTypesDTO, ResultType<DeleteDocumentTypesResponseDTO>> {
}