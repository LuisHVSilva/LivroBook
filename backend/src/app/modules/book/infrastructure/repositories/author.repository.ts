import {inject, injectable} from "tsyringe";
import {RepositoryBase} from "@coreShared/base/repository.base";
import {ModelStatic} from "sequelize";
import {SequelizeWhereBuilderUtil} from "@coreShared/utils/sequelizeWhereBuilder.util";
import {AuthorBaseRepositoryType} from "@modules/book/adapters/dtos/author.dto";
import {IAuthorRepository} from "@modules/book/infrastructure/repositories/interfaces/IAuthor.repository";
import {AuthorModel} from "@modules/book/infrastructure/models/author.model";
import {AuthorEntity} from "@modules/book/domain/entities/author.entity";

@injectable()
export class AuthorRepository extends RepositoryBase<AuthorBaseRepositoryType> implements IAuthorRepository {
    constructor(
        @inject("AuthorModel") model: ModelStatic<AuthorModel>,
    ) {
        super(model);
    }

    protected override makeFilter(filters?: AuthorBaseRepositoryType["Filter"]): SequelizeWhereBuilderUtil<AuthorBaseRepositoryType["Filter"]> {
        return super.makeFilter(filters, {
            id: {in: true},
            name: {like: true},
            statusId: {in: true},
        });
    }


    protected toPersistence(entity: AuthorBaseRepositoryType["Entity"]): AuthorBaseRepositoryType["Persistence"] {
        return {
            name: entity.name,
            statusId: entity.statusId,
        };
    }

    protected toEntity(model: AuthorBaseRepositoryType["Model"]): AuthorBaseRepositoryType["Entity"] {
        return AuthorEntity.create({
            id: model.id,
            name: model.name,
            statusId: model.statusId,
        });
    }
}