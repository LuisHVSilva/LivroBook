// ---------- BASE ----------
import {BaseRepositoryType, DtoBaseType} from "@coreShared/types/entity.type";
import {DocumentTypeModel} from "@document/infrastructure/models/documentType.model";
import {DocumentTypeProps} from "@document/domain/entities/documentType.entity";
import {AbstractControllerBaseType} from "@coreShared/types/controller.type";

export type DocumentTypeDTO = DocumentTypeProps;

//---------- FILTER ---------
export type DocumentTypeFilterDTO = {
    id?: number | number[];
    description?: string | string[];
    country?: string | string[];
    status?: string | string[];
};

// ------- PERSISTENCE ------
export type DocumentTypePersistenceDTO = Omit<DocumentTypeDTO, "id">;

// ---------- CREATE ----------
export type CreateDocumentTypeDTO = Pick<DocumentTypeDTO, "description" | "country">;
export type CreateDocumentTypeResponseDTO = DocumentTypeDTO;

// ---------- UPDATE ----------
export type UpdateDocumentTypeDTO = Partial<Omit<DocumentTypeDTO, "id">> & { id: number };
export type UpdateDocumentTypeResponseDTO = DocumentTypeDTO;

// ---------- FIND ----------
export type FindByIdDocumentTypeResponseDTO = DocumentTypeDTO;

export type FindDocumentTypesRawDTO = {
    id?: string;
    description?: string;
    country?: string;
    status?: string;
    page?: string;
    limit?: string;
};
export type FindDocumentTypesResponseDTO = {
    page: number;
    limit: number;
    totalPages: number;
    data: DocumentTypeDTO[];
};

// ------ DTO BASE TYPE -------
export type DocumentTypeDtoBaseType = DtoBaseType<
    DocumentTypeDTO,
    CreateDocumentTypeDTO,
    FindDocumentTypesRawDTO,
    UpdateDocumentTypeDTO,
    DocumentTypeFilterDTO
>

// ------ BASE REPOSITORY TYPE -------
export interface DocumentTypeNormalizedRelations {
    countryId: number;
    statusId: number;
}
export type DocumentTypeBaseRepositoryType = BaseRepositoryType<
    DocumentTypeModel,
    DocumentTypeProps,
    DocumentTypeFilterDTO,
    DocumentTypePersistenceDTO,
    DocumentTypeNormalizedRelations
>;

// ------ BASE CONTROLLER TYPE -------
export type DocumentTypeAbstractControllerBaseType = AbstractControllerBaseType<
    DocumentTypeProps,
    CreateDocumentTypeDTO,
    CreateDocumentTypeResponseDTO,
    FindByIdDocumentTypeResponseDTO,
    FindDocumentTypesRawDTO,
    FindDocumentTypesResponseDTO,
    UpdateDocumentTypeDTO,
    UpdateDocumentTypeResponseDTO
>

