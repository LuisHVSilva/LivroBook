import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {UpdateDocumentTypeDTO} from "@document/adapters/dto/documentType.dto";
import {UpdateResultType} from "@coreShared/types/crudResult.type";
import {DocumentTypeEntity} from "@document/domain/entities/documentType.entity";

export interface IUpdateDocumentTypeUseCase extends IUseCase<UpdateDocumentTypeDTO, UpdateResultType<DocumentTypeEntity>> {
}