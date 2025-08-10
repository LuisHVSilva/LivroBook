import {inject, injectable} from "tsyringe";
import {Transaction, WhereOptions} from "sequelize";
import {ResultType} from "@coreShared/types/result.type";
import {ICityRepository} from "@location/infrastructure/repositories/interfaces/ICity.repository";
import {CityMapper} from "@location/infrastructure/mappers/city.mapper";
import {CityEntity} from "@location/domain/entities/city.entity";
import {CityModel} from "@location/infrastructure/models/city.model";
import {CityDTO, CityFilterDTO} from "@location/adapters/dtos/city.dto";
import {FindAllType} from "@coreShared/types/findAll.type";
import {SequelizeWhereBuilderUtil} from "@coreShared/utils/sequelizeWhereBuilder.util";
import {StateDTO} from "@location/adapters/dtos/state.dto";


@injectable()
export class CityRepository implements ICityRepository {
    constructor(
        @inject("CityMapper") private readonly mapper: CityMapper,
    ) {
    }

    async create(entity: CityEntity, transaction?: Transaction): Promise<ResultType<CityEntity>> {
        const data = this.mapper.toPersistence(entity);
        const model: CityModel = await CityModel.create(data, {transaction});
        const restored: CityEntity = this.mapper.toEntity(model);

        return ResultType.success(restored);
    }

    async findById(id: number): Promise<ResultType<CityEntity>> {
        const model: CityModel | null = await CityModel.findByPk(id);
        return model ? ResultType.success(this.mapper.toEntity(model)) : ResultType.none();
    }

    async findMany(limit: number, offset: number, filters?: CityFilterDTO): Promise<ResultType<FindAllType<CityEntity>>> {
        const builder = new SequelizeWhereBuilderUtil<CityFilterDTO>(filters, {
            id: {in: true},
            description: {like: true},
        });

        const where: WhereOptions = builder.build();

        const [models, total] = await Promise.all([
            CityModel.findAll({
                where,
                limit,
                offset,
                order: [['id', 'ASC']],
            }),
            CityModel.count({
                where,
            }),
        ]);

        const entities: CityEntity[] = models.map(model => this.mapper.toEntity(model))

        return ResultType.success({entities: entities, total: total});
    }

    async findOneByFilter(filters?: CityFilterDTO): Promise<ResultType<CityEntity>> {
        const where: Partial<Record<keyof StateDTO, any>> = this.buildWhereClause(filters);

        const model = await CityModel.findOne({
            where,
            order: [['id', 'ASC']],
        });

        return model ? ResultType.success(this.mapper.toEntity(model)) : ResultType.none();
    }

    async update(entity: CityEntity, transaction?: Transaction, model?: CityModel): Promise<ResultType<boolean>> {
        const modelToUpdate = model ?? await CityModel.findByPk(entity.id, {transaction});
        if (!modelToUpdate) return ResultType.failure(new Error("City not found"));
        modelToUpdate.description = entity.description;
        modelToUpdate.statusId = entity.statusId;
        modelToUpdate.statusId = entity.statusId;
        await modelToUpdate.save({transaction});
        return ResultType.success(true);
    }

    private buildWhereClause(filters?: CityFilterDTO): Partial<Record<keyof CityDTO, any>> {
        const where: Partial<Record<keyof CityDTO, any>> = {};

        if (filters == null) return where;

        if (filters.id !== undefined) where.id = filters.id;
        if (filters.description !== undefined) where.description = filters.description;
        if (filters.stateId !== undefined) where.stateId = filters.stateId;
        if (filters.statusId !== undefined) where.statusId = filters.statusId;


        return where;
    }

}