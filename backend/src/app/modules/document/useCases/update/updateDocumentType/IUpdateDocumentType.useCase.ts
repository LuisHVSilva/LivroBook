import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {UpdateDocumentTypeDTO, UpdateDocumentTypeResponseDTO} from "@document/adapters/dto/documentType.dto";
import {UpdateResultType} from "@coreShared/types/crudResult.type";

export interface IUpdateDocumentTypeUseCase extends IUseCase<UpdateDocumentTypeDTO, UpdateResultType<UpdateDocumentTypeResponseDTO>> {
}