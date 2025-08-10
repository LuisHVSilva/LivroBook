import {ICountryRepository} from "@location/infrastructure/repositories/interfaces/ICountry.repository";
import {inject, injectable} from "tsyringe";
import {CountryMapper} from "@location/infrastructure/mappers/country.mapper";
import {Transaction, WhereOptions} from "sequelize";
import {ResultType} from "@coreShared/types/result.type";
import {CountryEntity} from "@location/domain/entities/country.entity";
import {CountryModel} from "@location/infrastructure/models/country.model";
import {CountryFilterDTO} from "@location/adapters/dtos/country.dto";
import {FindAllType} from "@coreShared/types/findAll.type";
import {SequelizeWhereBuilderUtil} from "@coreShared/utils/sequelizeWhereBuilder.util";
import {StateDTO} from "@location/adapters/dtos/state.dto";

@injectable()
export class CountryRepository implements ICountryRepository {
    constructor(
        @inject("CountryMapper") private readonly mapper: CountryMapper
    ) {
    }

    async create(entity: CountryEntity, transaction: Transaction): Promise<ResultType<CountryEntity>> {
        const data = this.mapper.toPersistence(entity);
        const model: CountryModel = await CountryModel.create(data, {transaction});
        const restored: CountryEntity = this.mapper.toEntity(model);

        return ResultType.success(restored);
    }

    async findById(id: number): Promise<ResultType<CountryEntity>> {
        const model: CountryModel | null = await CountryModel.findByPk(id);
        return model ? ResultType.success(this.mapper.toEntity(model)) : ResultType.none();
    }

    async findMany(limit: number, offset: number, filters?: CountryFilterDTO): Promise<ResultType<FindAllType<CountryEntity>>> {
        const builder = new SequelizeWhereBuilderUtil<CountryFilterDTO>(filters, {
            id: {in: true},
            description: {like: true},
        });

        const where: WhereOptions = builder.build();

        const [models, total] = await Promise.all([
            CountryModel.findAll({
                where,
                limit,
                offset,
                order: [['id', 'ASC']],
            }),
            CountryModel.count({
                where,
            }),
        ]);

        const entities: CountryEntity[] = models.map(model => this.mapper.toEntity(model))

        return ResultType.success({entities: entities, total: total});
    }

    async findOneByFilter(filters: CountryFilterDTO): Promise<ResultType<CountryEntity>> {
        const where: Partial<Record<keyof StateDTO, any>> = this.buildWhereClause(filters);

        const model: CountryModel | null = await CountryModel.findOne({
            where,
            order: [['id', 'ASC']],
        });

        return model ? ResultType.success(this.mapper.toEntity(model)) : ResultType.none();
    }

    async update(entity: CountryEntity, transaction: Transaction, model?: CountryModel): Promise<ResultType<boolean>> {
        const modelToUpdate: CountryModel | null = model ?? await CountryModel.findByPk(entity.id, {transaction});
        if (!modelToUpdate) return ResultType.failure(new Error("Country not found"));
        modelToUpdate.description = entity.description;
        modelToUpdate.statusId = entity.statusId;
        await modelToUpdate.save({transaction});
        return ResultType.success(true);
    }

    private buildWhereClause(filters?: CountryFilterDTO): Partial<Record<keyof StateDTO, any>> {
        const where: Partial<Record<keyof StateDTO, any>> = {};

        if (filters == null) return where;

        if (filters.id !== undefined) where.id = filters.id
        if (filters.description !== undefined) where.description = filters.description
        if (filters.statusId !== undefined) where.statusId = filters.statusId

        return where;
    }
}