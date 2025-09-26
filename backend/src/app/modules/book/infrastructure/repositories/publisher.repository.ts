import {inject, injectable} from "tsyringe";
import {RepositoryBase} from "@coreShared/base/repository.base";
import {ModelStatic} from "sequelize";
import {SequelizeWhereBuilderUtil} from "@coreShared/utils/sequelizeWhereBuilder.util";
import {PublisherBaseRepositoryType} from "@modules/book/adapters/dtos/publisher.dto";
import {IPublisherRepository} from "@modules/book/infrastructure/repositories/interfaces/IPublisher.repository";
import {PublisherModel} from "@modules/book/infrastructure/models/publisher.model";
import {PublisherEntity} from "@modules/book/domain/entities/publisher.entity";

@injectable()
export class PublisherRepository extends RepositoryBase<PublisherBaseRepositoryType> implements IPublisherRepository {
    constructor(
        @inject("PublisherModel") model: ModelStatic<PublisherModel>,
    ) {
        super(model);
    }

    protected override makeFilter(filters?: PublisherBaseRepositoryType["Filter"]): SequelizeWhereBuilderUtil<PublisherBaseRepositoryType["Filter"]> {
        return super.makeFilter(filters, {
            id: {in: true},
            name: {like: true},
            statusId: {in: true},
        });
    }


    protected toPersistence(entity: PublisherBaseRepositoryType["Entity"]): PublisherBaseRepositoryType["Persistence"] {
        return {
            name: entity.name,
            statusId: entity.statusId,
        };
    }

    protected toEntity(model: PublisherBaseRepositoryType["Model"]): PublisherBaseRepositoryType["Entity"] {
        return PublisherEntity.create({
            id: model.id,
            name: model.name,
            statusId: model.statusId,
        });
    }
}