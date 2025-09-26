// ---------- BASE ----------
import {BaseRepositoryType, DtoBaseType} from "@coreShared/types/entity.type";
import {AuthorEntity, AuthorProps} from "@modules/book/domain/entities/author.entity";
import {AuthorModel} from "@modules/book/infrastructure/models/author.model";

export type AuthorDTO = AuthorProps;

//---------- FILTER ---------
export type AuthorFilterDTO = {
    id?: number[];
    name?: string[];
    statusId?: number[];
    page?: number;
    limit?: number;
};

// ------- PERSISTENCE ------
export type AuthorPersistenceDTO = Omit<AuthorDTO, "id">;

// ---------- CREATE ----------
export type CreateAuthorDTO = Pick<AuthorDTO, "name">;
export type CreateAuthorResponseDTO = AuthorDTO;

// ---------- UPDATE ----------
export type UpdateAuthorDTO = Partial<Omit<AuthorDTO, "id">> & { id: number };
export type UpdateAuthorResponseDTO = AuthorDTO;

// ---------- FIND ----------
export type FindAuthorsRawDTO = {
    id?: string;
    name?: string;
    countryId?: string;
    statusId?: string;
    page?: string;
    limit?: string;
};
export type FindAuthorsResponseDTO = {
    page: number;
    limit: number;
    totalPages: number;
    data: AuthorDTO[];
};

// ------ DTO BASE TYPE -------
export type AuthorDtoBaseType = DtoBaseType<
    AuthorDTO,
    CreateAuthorDTO,
    FindAuthorsRawDTO,
    UpdateAuthorDTO,
    AuthorFilterDTO
>

// ------ BASE REPOSITORY TYPE -------
export type AuthorBaseRepositoryType = BaseRepositoryType<
    AuthorModel,
    AuthorEntity,
    AuthorFilterDTO,
    AuthorPersistenceDTO
>;
