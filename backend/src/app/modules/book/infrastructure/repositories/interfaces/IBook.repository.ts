import {IRepositoryBase} from "@coreShared/base/interfaces/IRepositoryBase";
import {BookBaseRepositoryType} from "@modules/book/adapters/dtos/book.dto";

export interface IBookRepository extends IRepositoryBase<BookBaseRepositoryType> {
}