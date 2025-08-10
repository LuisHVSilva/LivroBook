import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {
    CreateDocumentTypeDTO, CreateDocumentTypeResponseDTO
} from "@document/adapters/dto/documentType.dto";
import {ResultType} from "@coreShared/types/result.type";

export interface ICreateDocumentTypeUseCase extends IUseCase<CreateDocumentTypeDTO, ResultType<CreateDocumentTypeResponseDTO>> {
}