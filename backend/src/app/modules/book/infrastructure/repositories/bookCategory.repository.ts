import {inject, injectable} from "tsyringe";
import {RepositoryBase} from "@coreShared/base/repository.base";
import {ModelStatic} from "sequelize";
import {SequelizeWhereBuilderUtil} from "@coreShared/utils/sequelizeWhereBuilder.util";
import {BookCategoryBaseRepositoryType} from "@modules/book/adapters/dtos/bookCategory.dto";
import {IBookCategoryRepository} from "@modules/book/infrastructure/repositories/interfaces/IBookCategory.repository";
import {BookCategoryModel} from "@modules/book/infrastructure/models/bookCategory.model";
import {BookCategoryEntity} from "@modules/book/domain/entities/bookCategory.entity";

@injectable()
export class BookCategoryRepository extends RepositoryBase<BookCategoryBaseRepositoryType> implements IBookCategoryRepository {
    constructor(
        @inject("BookCategoryModel") model: ModelStatic<BookCategoryModel>,
    ) {
        super(model);
    }

    protected override makeFilter(filters?: BookCategoryBaseRepositoryType["Filter"]): SequelizeWhereBuilderUtil<BookCategoryBaseRepositoryType["Filter"]> {
        return super.makeFilter(filters, {
            id: {in: true},
            description: {like: true},
            statusId: {in: true},
        });
    }


    protected toPersistence(entity: BookCategoryBaseRepositoryType["Entity"]): BookCategoryBaseRepositoryType["Persistence"] {
        return {
            description: entity.description,
            statusId: entity.statusId,
        };
    }

    protected toEntity(model: BookCategoryBaseRepositoryType["Model"]): BookCategoryBaseRepositoryType["Entity"] {
        return BookCategoryEntity.create({
            id: model.id,
            description: model.description,
            statusId: model.statusId,
        });
    }
}