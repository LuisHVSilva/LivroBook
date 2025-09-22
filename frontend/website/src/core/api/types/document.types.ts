export type DocumentTypeDTO = {
    id: number;
    description: string;
    countryId: number;
    statusId: number;
};

export type FindDocumentTypesRawDTO = {
    id?: string;
    description?: string;
    countryId?: string;
    statusId?: string;
    page?: string;
    limit?: string;
};
export type FindDocumentTypesResponseDTO = {
    page: number;
    limit: number;
    totalPages: number;
    data: DocumentTypeDTO[];
};