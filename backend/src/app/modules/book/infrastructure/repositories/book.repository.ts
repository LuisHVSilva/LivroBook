import {inject, injectable} from "tsyringe";
import {RepositoryBase} from "@coreShared/base/repository.base";
import {ModelStatic} from "sequelize";
import {SequelizeWhereBuilderUtil} from "@coreShared/utils/sequelizeWhereBuilder.util";
import {BookBaseRepositoryType} from "@modules/book/adapters/dtos/book.dto";
import {IBookRepository} from "@modules/book/infrastructure/repositories/interfaces/IBook.repository";
import {BookModel} from "@modules/book/infrastructure/models/book.model";
import {BookEntity} from "@modules/book/domain/entities/book.entity";

@injectable()
export class BookRepository extends RepositoryBase<BookBaseRepositoryType> implements IBookRepository {
    constructor(
        @inject("BookModel") model: ModelStatic<BookModel>,
    ) {
        super(model);
    }

    protected override makeFilter(filters?: BookBaseRepositoryType["Filter"]): SequelizeWhereBuilderUtil<BookBaseRepositoryType["Filter"]> {
        return super.makeFilter(filters, {
            id: {in: true},
            name: {like: true},
            pageCount: {in: true},
            publishedDate: {in: true},
            authorId: {in: true},
            publisherId: {in: true},
            bookCategoryId: {in: true},
            languageId: {in: true},
            statusId: {in: true},
        });
    }


    protected toPersistence(entity: BookBaseRepositoryType["Entity"]): BookBaseRepositoryType["Persistence"] {
        return {
            name: entity.name,
            pageCount: entity.pageCount,
            publishedDate: entity.publishedDate,
            authorId: entity.authorId,
            publisherId: entity.publisherId,
            bookCategoryId: entity.bookCategoryId,
            languageId: entity.languageId,
            statusId: entity.statusId,
        };
    }

    protected toEntity(model: BookBaseRepositoryType["Model"]): BookBaseRepositoryType["Entity"] {
        return BookEntity.create({
            id: model.id,
            name: model.name,
            pageCount: model.pageCount,
            publishedDate: model.publishedDate,
            authorId: model.authorId,
            publisherId: model.publisherId,
            bookCategoryId: model.bookCategoryId,
            languageId: model.languageId,
            statusId: model.statusId,
        });
    }
}