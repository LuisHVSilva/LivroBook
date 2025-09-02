import {
    CreateDocumentTypeDTO, DocumentTypeDTO,
    DocumentTypeFilterDTO, FindDocumentTypesDTO,
    UpdateDocumentTypeDTO
} from "@document/adapters/dto/documentType.dto";
import {DocumentTypeEntity} from "@document/domain/entities/documentType.entity";
import {IServiceBase} from "@coreShared/base/interfaces/IServiceBase";
import {DtoBaseType} from "@coreShared/types/entity.type";


export type DocumentTypeDtoBaseType = DtoBaseType<
    DocumentTypeDTO,
    CreateDocumentTypeDTO,
    FindDocumentTypesDTO,
    UpdateDocumentTypeDTO,
    DocumentTypeFilterDTO
>

export interface IDocumentTypeService extends IServiceBase<DocumentTypeDtoBaseType, DocumentTypeEntity> {
}