// ---------- BASE ----------
import {BaseRepositoryType} from "@coreShared/types/entity.type";
import {StatusModel} from "@status/infrastructure/models/status.model";
import {StatusEntity} from "@status/domain/entities/status.entity";

export type StatusDto = {
    id?: number;
    description: string;
    active: boolean;
};

// --------- FILTER -----------
export type FilterStatusDTO = {
    id?: number | number[],
    description?: string | string[]
    active?: boolean | boolean[]
}

// ------- PERSISTENCE --------
export type StatusPersistenceDTO = Omit<StatusDto, "id">;

// ---------- CREATE ----------
export type CreateStatusDTO = Pick<StatusDto, "description">;
export type CreateStatusResponseDTO = StatusDto;

// ---------- UPDATE ----------
export type UpdateStatusDTO = Partial<Omit<StatusDto, "id">> & { id: number };
export type UpdateStatusResponseDTO = StatusDto;

// ---------- FIND ------------
export type FindStatusesRawDTO = {
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

// ------ BASE REPOSITORY TYPE -------
export type StatusBaseRepositoryType = BaseRepositoryType<StatusModel, StatusEntity, FilterStatusDTO, StatusPersistenceDTO, any>;