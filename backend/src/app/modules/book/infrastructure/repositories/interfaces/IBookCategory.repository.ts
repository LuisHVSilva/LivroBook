import {IRepositoryBase} from "@coreShared/base/interfaces/IRepositoryBase";
import {BookCategoryBaseRepositoryType} from "@modules/book/adapters/dtos/bookCategory.dto";

export interface IBookCategoryRepository extends IRepositoryBase<BookCategoryBaseRepositoryType> {
}