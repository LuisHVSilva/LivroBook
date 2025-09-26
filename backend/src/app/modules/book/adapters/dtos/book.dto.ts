// ---------- BASE ----------
import {BaseRepositoryType, DtoBaseType} from "@coreShared/types/entity.type";
import {BookEntity, BookProps} from "@modules/book/domain/entities/book.entity";
import {BookModel} from "@modules/book/infrastructure/models/book.model";

export type BookDTO = BookProps;

//---------- FILTER ---------
export type BookFilterDTO = {
    id?: number[];
    name: string[];
    pageCount?: number[];
    publishedDate?: Date[];
    authorId?: number[];
    publisherId?: number[];
    bookCategoryId: number[];
    languageId: number[];
    statusId: number[];
    page?: number;
    limit?: number;
};

// ------- PERSISTENCE ------
export type BookPersistenceDTO = Omit<BookDTO, "id">;

// ---------- CREATE ----------
export type CreateBookDTO = Pick<BookDTO, "name" | "pageCount" | "publishedDate" | "authorId" | "publisherId" | "bookCategoryId" | "languageId">;
export type CreateBookResponseDTO = BookDTO;

// ---------- UPDATE ----------
export type UpdateBookDTO = Partial<Omit<BookDTO, "id">> & { id: number };
export type UpdateBookResponseDTO = BookDTO;

// ---------- FIND ----------
export type FindBooksRawDTO = {
    id?: string;
    name?: string;
    pageCount?: string;
    publishedDate?: string;
    authorId?: string;
    publisherId?: string;
    bookCategoryId?: string;
    languageId?: string;
    statusId?: string;
    page?: string;
    limit?: string;
};
export type BooksResponseDTO = {
    page: number;
    limit: number;
    totalPages: number;
    data: BookDTO[];
};

// ------ DTO BASE TYPE -------
export type BookDtoBaseType = DtoBaseType<
    BookDTO,
    CreateBookDTO,
    FindBooksRawDTO,
    UpdateBookDTO,
    BookFilterDTO
>

// ------ BASE REPOSITORY TYPE -------
export type BookBaseRepositoryType = BaseRepositoryType<
    BookModel,
    BookEntity,
    BookFilterDTO,
    BookPersistenceDTO
>;
