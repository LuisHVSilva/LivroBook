import {IStatusRepository} from "@status/infrastructure/repositories/IStatusRepository";
import {ResultType} from "@coreShared/types/result.type";
import {StatusEntity} from "@status/domain/entities/status.entity";
import {StatusModel} from "@status/infrastructure/models/status.model";
import {RepositoryBase} from "@coreShared/base/repository.base";
import {StatusBaseRepositoryType} from "@status/adapters/dtos/status.dto";
import {inject, injectable} from "tsyringe";
import {FindOptions, InferCreationAttributes, ModelStatic, Transaction} from "sequelize";

@injectable()
export class StatusRepository extends RepositoryBase<StatusBaseRepositoryType> implements IStatusRepository {

    constructor(
        @inject("StatusModel") model: ModelStatic<StatusModel>,
    ) {
        super(model);
    }

    async findByDescription(description: string): Promise<ResultType<StatusBaseRepositoryType["Entity"]>> {
        const model: StatusBaseRepositoryType["Model"] | null = await StatusModel.findOne({where: {description}});

        return model ? ResultType.success((await this.toEntity(model))) : ResultType.none();
    }

    protected getIncludes(): FindOptions['include'] {
        return [
        ];
    }

    protected associationMap(): Partial<Record<keyof StatusBaseRepositoryType["Filter"], string>> {
        return {
        };
    }

    protected filter(): Partial<Record<keyof StatusBaseRepositoryType["Filter"], {
        in?: boolean;
        like?: boolean
    }>> | undefined {
        return {
            id: { in: true },
            description: { like: true },
        };
    }

    protected async toPersistence(entity: StatusBaseRepositoryType["Entity"], transaction?: Transaction): Promise<InferCreationAttributes<StatusModel>> {
        return {
            id: entity.id,
            description: entity.description,
            active: entity.active,
        };
    }

    protected async toEntity(model: StatusBaseRepositoryType["Model"]): Promise<StatusBaseRepositoryType["Entity"]> {
        return StatusEntity.create({
            id: model.id,
            description: model.description,
            active: model.active,
        });
    }
}