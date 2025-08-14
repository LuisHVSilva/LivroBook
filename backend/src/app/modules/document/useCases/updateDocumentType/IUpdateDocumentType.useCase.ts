import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {UpdateDocumentTypeDTO, UpdateDocumentTypeResponseDTO} from "@document/adapters/dto/documentType.dto";

export interface IUpdateDocumentTypeUseCase extends IUseCase<UpdateDocumentTypeDTO, UpdateDocumentTypeResponseDTO> {
}