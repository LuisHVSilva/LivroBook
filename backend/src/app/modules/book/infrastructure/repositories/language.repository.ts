import {inject, injectable} from "tsyringe";
import {RepositoryBase} from "@coreShared/base/repository.base";
import {ModelStatic} from "sequelize";
import {SequelizeWhereBuilderUtil} from "@coreShared/utils/sequelizeWhereBuilder.util";
import {ILanguageRepository} from "@modules/book/infrastructure/repositories/interfaces/ILanguage.repository";
import {LanguageModel} from "@modules/book/infrastructure/models/language.model";
import {LanguageEntity} from "@modules/book/domain/entities/language.entity";
import {LanguageBaseRepositoryType} from "@modules/book/adapters/dtos/language.dto";

@injectable()
export class LanguageRepository extends RepositoryBase<LanguageBaseRepositoryType> implements ILanguageRepository {
    constructor(
        @inject("LanguageModel") model: ModelStatic<LanguageModel>,
    ) {
        super(model);
    }

    protected override makeFilter(filters?: LanguageBaseRepositoryType["Filter"]): SequelizeWhereBuilderUtil<LanguageBaseRepositoryType["Filter"]> {
        return super.makeFilter(filters, {
            id: {in: true},
            description: {like: true},
            statusId: {in: true},
        });
    }


    protected toPersistence(entity: LanguageBaseRepositoryType["Entity"]): LanguageBaseRepositoryType["Persistence"] {
        return {
            description: entity.description,
            statusId: entity.statusId,
        };
    }

    protected toEntity(model: LanguageBaseRepositoryType["Model"]): LanguageBaseRepositoryType["Entity"] {
        return LanguageEntity.create({
            id: model.id,
            description: model.description,
            statusId: model.statusId,
        });
    }
}