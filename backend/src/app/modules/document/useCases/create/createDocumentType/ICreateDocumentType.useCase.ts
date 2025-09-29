import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {
    CreateDocumentTypeDTO, CreateDocumentTypeResponseDTO
} from "@document/adapters/dto/documentType.dto";

export interface ICreateDocumentTypeUseCase extends IUseCase<CreateDocumentTypeDTO, CreateDocumentTypeResponseDTO> {
}