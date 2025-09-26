// ---------- BASE ----------
import {BaseRepositoryType, DtoBaseType} from "@coreShared/types/entity.type";
import {BookCategoryEntity, BookCategoryProps} from "@modules/book/domain/entities/bookCategory.entity";
import {BookCategoryModel} from "@modules/book/infrastructure/models/bookCategory.model";

export type BookCategoryDTO = BookCategoryProps;

//---------- FILTER ---------
export type BookCategoryFilterDTO = {
    id?: number[];
    description?: string[];
    statusId?: number[];
    page?: number;
    limit?: number;
};

// ------- PERSISTENCE ------
export type BookCategoryPersistenceDTO = Omit<BookCategoryDTO, "id">;

// ---------- CREATE ----------
export type CreateBookCategoryDTO = Pick<BookCategoryDTO, "description">;
export type CreateBookCategoryResponseDTO = BookCategoryDTO;

// ---------- UPDATE ----------
export type UpdateBookCategoryDTO = Partial<Omit<BookCategoryDTO, "id">> & { id: number };
export type UpdateBookCategoryResponseDTO = BookCategoryDTO;

// ---------- FIND ----------
export type FindBookCategoriesRawDTO = {
    id?: string;
    description?: string;
    countryId?: string;
    statusId?: string;
    page?: string;
    limit?: string;
};
export type FindBookCategoriesResponseDTO = {
    page: number;
    limit: number;
    totalPages: number;
    data: BookCategoryDTO[];
};

// ------ DTO BASE TYPE -------
export type BookCategoryDtoBaseType = DtoBaseType<
    BookCategoryDTO,
    CreateBookCategoryDTO,
    FindBookCategoriesRawDTO,
    UpdateBookCategoryDTO,
    BookCategoryFilterDTO
>

// ------ BASE REPOSITORY TYPE -------
export type BookCategoryBaseRepositoryType = BaseRepositoryType<
    BookCategoryModel,
    BookCategoryEntity,
    BookCategoryFilterDTO,
    BookCategoryPersistenceDTO
>;
