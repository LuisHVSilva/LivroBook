import {IRepositoryBase} from "@coreShared/base/interfaces/IRepositoryBase";
import {AuthorBaseRepositoryType} from "@modules/book/adapters/dtos/author.dto";

export interface IAuthorRepository extends IRepositoryBase<AuthorBaseRepositoryType> {
}