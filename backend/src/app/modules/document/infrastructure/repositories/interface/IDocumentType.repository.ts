import {IBaseRepository} from "@coreShared/interfaces/IBaseRepository";
import {DocumentTypeEntity} from "@document/domain/entities/documentType.entity";
import {DocumentTypeModel} from "@document/infrastructure/models/documentType.model";
import {DocumentTypeFilterDTO} from "@document/adapters/dto/documentType.dto";

export interface IDocumentTypeRepository extends IBaseRepository<DocumentTypeEntity, DocumentTypeModel, DocumentTypeFilterDTO> {


}