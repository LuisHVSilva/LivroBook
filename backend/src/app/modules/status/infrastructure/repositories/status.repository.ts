import {
    IStatusRepository,
    StatusBaseRepositoryType,
    StatusPersistenceDTO
} from "@status/infrastructure/repositories/IStatusRepository";
import {ResultType} from "@coreShared/types/result.type";
import {StatusEntity} from "@status/domain/entities/status.entity";
import {StatusModel} from "@status/infrastructure/models/status.model";
import {RepositoryBase} from "@coreShared/base/repository.base";
import {SequelizeWhereBuilderUtil} from "@coreShared/utils/sequelizeWhereBuilder.util";
import {FilterStatusDTO} from "@status/adapters/dtos/status.dto";
import {inject, injectable} from "tsyringe";
import {ModelStatic} from "sequelize";

@injectable()
export class StatusRepository extends RepositoryBase<StatusBaseRepositoryType> implements IStatusRepository {

    constructor(
        @inject("StatusModel") model: ModelStatic<StatusModel>,
    ) {
        super(model);
    }

    async findByDescription(description: string): Promise<ResultType<StatusEntity>> {
        const model: StatusModel | null = await StatusModel.findOne({where: {description}});

        return model ? ResultType.success(this.toEntity(model)) : ResultType.none();
    }

    protected makeFilter(filters?: FilterStatusDTO): SequelizeWhereBuilderUtil<FilterStatusDTO> {
        return super.makeFilter(filters, {
            id: { in: true },
            description: { like: true },
        });
    }

    protected toPersistence(entity: StatusEntity): StatusPersistenceDTO {
        return {
            description: entity.description,
            active: entity.active,
        };
    }

    protected toEntity(model: StatusModel): StatusEntity {
        return StatusEntity.create({
            id: model.id,
            description: model.description,
            active: model.active,
        });
    }
}