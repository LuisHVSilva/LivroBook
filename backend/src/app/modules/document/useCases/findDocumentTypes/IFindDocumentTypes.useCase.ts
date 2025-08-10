import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {FindDocumentTypesDTO, FindDocumentTypesResponseDTO} from "@document/adapters/dto/documentType.dto";
import {ResultType} from "@coreShared/types/result.type";

export interface IFindDocumentTypesUseCase extends IUseCase<FindDocumentTypesDTO, ResultType<FindDocumentTypesResponseDTO>> {
}