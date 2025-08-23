export type DocumentTypeDTO = {
    id?: number;
    description?: string;
    countryId?: number;
    statusId?: number;
}

export type DocumentTypeFilterDTO = {
    id?: number[] | number;
    description?: string[] | string;
    countryId?: number[] | number;
    statusId?: number[] | number;
    page?: number;
    limit?: number;
}

export type CreateDocumentTypeDTO = {
    description: string;
    countryId: number;
}

export type CreateDocumentTypeResponseDTO = {
    id: number;
    description: string;
    countryId: number;
    statusId: number;
}

export type FindDocumentTypesDTO = {
    id?: string[];
    description?: string[];
    countryId?: string[];
    statusId?: string[];
    page?: string;
    limit?: string;
};

export type FindDocumentTypesResponseDTO = {
    page?: number;
    limit?: number;
    totalPages?: number;
    data: DocumentTypeDTO[];
};

export type UpdateDocumentTypeDTO = {
    id: number;
    description?: string;
    countryId?: number;
    statusId?: number;
}