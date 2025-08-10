import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {UpdateDocumentTypeDTO, UpdateDocumentTypeResponseDTO} from "@document/adapters/dto/documentType.dto";
import {ResultType} from "@coreShared/types/result.type";

export interface IUpdateDocumentTypeUseCase extends IUseCase<UpdateDocumentTypeDTO, ResultType<UpdateDocumentTypeResponseDTO>> {
}