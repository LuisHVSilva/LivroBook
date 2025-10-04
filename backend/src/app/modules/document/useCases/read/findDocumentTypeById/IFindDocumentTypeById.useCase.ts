import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {FindByIdRequestDTO} from "@coreShared/dtos/operation.dto";
import {FindByIdDocumentTypeResponseDTO} from "@document/adapters/dto/documentType.dto";

export interface IFindDocumentTypeByIdUseCase extends IUseCase<FindByIdRequestDTO, FindByIdDocumentTypeResponseDTO>{

}