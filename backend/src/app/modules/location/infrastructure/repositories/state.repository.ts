import {inject, injectable} from "tsyringe";
import {IStateRepository} from "@location/infrastructure/repositories/interfaces/IState.repository";
import {StateMapper} from "@location/infrastructure/mappers/state.mapper";
import {Transaction, WhereOptions} from "sequelize";
import {ResultType} from "@coreShared/types/result.type";
import {StateEntity} from "@location/domain/entities/state.entity";
import {StateModel} from "@location/infrastructure/models/state.model";
import {StateDTO, StateFilterDTO} from "@location/adapters/dtos/state.dto";
import {FindAllType} from "@coreShared/types/findAll.type";
import {SequelizeWhereBuilderUtil} from "@coreShared/utils/sequelizeWhereBuilder.util";


@injectable()
export class StateRepository implements IStateRepository {
    constructor(
        @inject("StateMapper") private readonly mapper: StateMapper,
    ) {
    }

    async create(entity: StateEntity, transaction?: Transaction): Promise<ResultType<StateEntity>> {
        const data = this.mapper.toPersistence(entity);
        const model: StateModel = await StateModel.create(data, {transaction});
        const restored: StateEntity = this.mapper.toEntity(model);

        return ResultType.success(restored);
    }

    async findById(id: number): Promise<ResultType<StateEntity>> {
        const model: StateModel | null = await StateModel.findByPk(id);
        return model ? ResultType.success(this.mapper.toEntity(model)) : ResultType.none();
    }

    async findMany(limit: number, offset: number, filters?: StateFilterDTO): Promise<ResultType<FindAllType<StateEntity>>> {
        const builder = new SequelizeWhereBuilderUtil<StateFilterDTO>(filters, {
            id: {in: true},
            description: {like: true},
        });

        const where: WhereOptions = builder.build();

        const [models, total] = await Promise.all([
            StateModel.findAll({
                where,
                limit,
                offset,
                order: [['id', 'ASC']],
            }),
            StateModel.count({
                where,
            }),
        ]);

        const entities: StateEntity[] = models.map(model => this.mapper.toEntity(model))

        return ResultType.success({entities: entities, total: total});
    }

    async findOneByFilter(filters?: StateFilterDTO): Promise<ResultType<StateEntity>> {
        const where: Partial<Record<keyof StateDTO, any>> = this.buildWhereClause(filters);

        const model = await StateModel.findOne({
            where,
            order: [['id', 'ASC']],
        });

        return model ? ResultType.success(this.mapper.toEntity(model)) : ResultType.none();
    }

    async update(entity: StateEntity, transaction?: Transaction, model?: StateModel): Promise<ResultType<boolean>> {
        const modelToUpdate = model ?? await StateModel.findByPk(entity.id, {transaction});
        if (!modelToUpdate) return ResultType.failure(new Error("Status not found"));
        modelToUpdate.description = entity.description;
        modelToUpdate.statusId = entity.statusId;
        modelToUpdate.countryId = entity.countryId;
        await modelToUpdate.save({transaction});
        return ResultType.success(true);
    }

    private buildWhereClause(filters?: StateFilterDTO): Partial<Record<keyof StateDTO, any>> {
        const where: Partial<Record<keyof StateDTO, any>> = {};

        if (filters == null) return where;

        if (filters.id != null) where.id = filters.id;
        if (filters.description) where.description = filters.description;
        if (filters.statusId != null) where.statusId = filters.statusId;
        if (filters.countryId != null) where.countryId = filters.countryId;

        return where;
    }

}