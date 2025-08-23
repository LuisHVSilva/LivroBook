import {inject, injectable} from "tsyringe";
import {Transaction, WhereOptions} from 'sequelize';
import {IStatusRepository} from "@status/infrastructure/repositories/IStatusRepository";
import {StatusEntity} from "@status/domain/entities/status.entity";
import {ResultType} from "@coreShared/types/result.type";
import {StatusModel} from "@status/infrastructure/models/status.model";
import {StatusMapper} from "@status/infrastructure/mappers/status.mapper";
import {FindFilterStatusDTO, StatusDto} from "@status/adapters/dtos/status.dto";
import {FindAllType} from "@coreShared/types/findAll.type";
import {SequelizeWhereBuilderUtil} from "@coreShared/utils/sequelizeWhereBuilder.util";

@injectable()
export class StatusRepository implements IStatusRepository {

    constructor(
        @inject("StatusMapper") private readonly mapper: StatusMapper
    ) {
    }

    async create(entity: StatusEntity, transaction?: Transaction): Promise<ResultType<StatusEntity>> {
        const data = this.mapper.toPersistence(entity);
        const model: StatusModel = await StatusModel.create(data, {transaction});
        const restored: StatusEntity = this.mapper.toEntity(model);

        return ResultType.success(restored);
    }

    async findMany(limit: number, offset: number, filters?: FindFilterStatusDTO): Promise<ResultType<FindAllType<StatusEntity>>> {
        const builder = new SequelizeWhereBuilderUtil<FindFilterStatusDTO>(filters, {
            id: { in: true },
            description: { like: true },
        });

        const where: WhereOptions = builder.build();

        const [models, total] = await Promise.all([
            StatusModel.findAll({
                where,
                limit,
                offset,
                order: [['id', 'ASC']],
            }),
            StatusModel.count({
                where,
            }),
        ]);

        const entities: StatusEntity[] = models.map(model => this.mapper.toEntity(model))

        return ResultType.success({entities: entities, total: total});
    }

    async findOneByFilter(filter?: FindFilterStatusDTO): Promise<ResultType<StatusEntity>> {
        const where = this.buildWhereClause(filter)

        const model: StatusModel | null = await StatusModel.findOne({
            where,
            order: [['id', 'ASC']],
        });

        return model ? ResultType.success(this.mapper.toEntity(model)) : ResultType.none();
    }

    async findByDescription(description: string): Promise<ResultType<StatusEntity>> {
        const model: StatusModel | null = await StatusModel.findOne({ where: { description } });
        return model ? ResultType.success(this.mapper.toEntity(model)) : ResultType.none();
    }

    async findById(id: number): Promise<ResultType<StatusEntity>> {
        const model: StatusModel | null = await StatusModel.findByPk(id);
        return model ? ResultType.success(this.mapper.toEntity(model)) : ResultType.none();
    }

    async update(entity: StatusEntity, transaction?: Transaction, model?: StatusModel): Promise<ResultType<boolean>> {
        const modelToUpdate = model ?? await StatusModel.findByPk(entity.id, {transaction});
        if (!modelToUpdate) return ResultType.failure(new Error("Status not found"));
        modelToUpdate.description = entity.description;
        modelToUpdate.active = entity.active;
        await modelToUpdate.save({transaction});
        return ResultType.success(true);
    }

    private buildWhereClause(filters?: FindFilterStatusDTO): Partial<Record<keyof StatusDto, any>> {
        const where: Partial<Record<keyof StatusDto, any>> = {};

        if (filters == null) return where;

        if (filters.id !== undefined) where.id = filters.id;
        if (filters.description !== undefined) where.description = filters.description;
        if (filters.active !== undefined) where.active = filters.active;

        return where;
    }
}