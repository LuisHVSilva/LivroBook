import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {FindDocumentTypesRawDTO, FindDocumentTypesResponseDTO} from "@document/adapters/dto/documentType.dto";

export interface IFindDocumentTypesUseCase extends IUseCase<FindDocumentTypesRawDTO, FindDocumentTypesResponseDTO> {
}