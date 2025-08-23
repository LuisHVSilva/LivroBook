export type StatusDto = {
    id?: number;
    description?: string;
    active?: boolean;
};

export type FindFilterStatusDTO = {
    id?: number[],
    description?: string[]
    active?: boolean[]
}

export type CreateStatusDTO = {
    description: string;
};

export type CreateStatusResponseDTO = {
    id: number;
    description: string;
    active: boolean;
};

export type FindStatusesDTO = {
    id?: string;
    description?: string;
    active?: string;
    page?: string;
    limit?: string;
};

export type FindStatusesResponseDTO = {
    page?: number;
    limit?: number;
    totalPages?: number;
    data: StatusDto[];
};

export type UpdateStatusDTO = {
    id: number;
    description?: string;
    active?: boolean;
};
