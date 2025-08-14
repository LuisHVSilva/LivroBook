import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {FindDocumentTypesDTO, FindDocumentTypesResponseDTO} from "@document/adapters/dto/documentType.dto";

export interface IFindDocumentTypesUseCase extends IUseCase<FindDocumentTypesDTO, FindDocumentTypesResponseDTO> {
}