import {StatusModel} from "@status/infrastructure/models/status.model";
import {AuthorModel} from "@modules/book/infrastructure/models/author.model";
import {PublisherModel} from "@modules/book/infrastructure/models/publisher.model";
import {BookCategoryModel} from "@modules/book/infrastructure/models/bookCategory.model";
import {LanguageModel} from "@modules/book/infrastructure/models/language.model";

export interface IBookModel {
    id: number;
    name: string;
    pageCount?: number;
    publishedDate?: Date;
    authorId?: number;
    publisherId?: number;
    bookCategoryId?: number;
    languageId?: number;
    statusId: number;
    author?: AuthorModel;
    publisher?: PublisherModel;
    bookCategory?: BookCategoryModel;
    language?: LanguageModel;
    status?: StatusModel;
    createdAt?: Date;
    updatedAt?: Date;
}