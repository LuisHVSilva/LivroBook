import {DocumentTypeEntity} from "@document/domain/entities/documentType.entity";
import {IServiceBase} from "@coreShared/base/interfaces/IServiceBase";
import {DocumentTypeDtoBaseType} from "@document/adapters/dto/documentType.dto";

export interface IDocumentTypeService extends IServiceBase<DocumentTypeDtoBaseType, DocumentTypeEntity> {
}