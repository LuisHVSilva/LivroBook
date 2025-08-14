import {inject, injectable} from "tsyringe";
import { PhoneTypeMapper } from "../mappers/phoneType.mapper";
import {IPhoneTypeRepository} from "@phone/infrastructure/repositories/interface/IPhoneType.repository";
import { PhoneTypeEntity } from "@phone/domain/entities/phoneType.entity";
import {Transaction, WhereOptions} from "sequelize";
import {ResultType} from "@coreShared/types/result.type";
import {PhoneTypeModel} from "@phone/infrastructure/models/phoneType.model";
import {PhoneTypeFilterDTO, PhoneTypeDTO} from "@phone/adapters/dtos/phoneType.dto";
import {FindAllType} from "@coreShared/types/findAll.type";
import {SequelizeWhereBuilderUtil} from "@coreShared/utils/sequelizeWhereBuilder.util";


@injectable()
export class PhoneTypeRepository implements IPhoneTypeRepository {
    constructor(
        @inject("PhoneTypeMapper") private mapper: PhoneTypeMapper,
    ) {
    }

    async create(entity: PhoneTypeEntity, transaction?: Transaction): Promise<ResultType<PhoneTypeEntity>> {
        const data = this.mapper.toPersistence(entity);
        const model: PhoneTypeModel = await PhoneTypeModel.create(data, {transaction});
        const restored: PhoneTypeEntity = this.mapper.toEntity(model);

        return ResultType.success(restored);
    }

    async findMany(limit: number, offset: number, filters?: PhoneTypeFilterDTO): Promise<ResultType<FindAllType<PhoneTypeEntity>>> {
        const builder = new SequelizeWhereBuilderUtil<PhoneTypeFilterDTO>(filters, {
            id: { in: true },
            description: { like: true },
            statusId: { in: true },
        });

        const where: WhereOptions = builder.build();

        const [models, total] = await Promise.all([
            PhoneTypeModel.findAll({
                where,
                limit,
                offset,
                order: [['id', 'ASC']],
            }),
            PhoneTypeModel.count({
                where,
            }),
        ]);

        const entities: PhoneTypeEntity[] = models.map(model => this.mapper.toEntity(model))

        return ResultType.success({entities: entities, total: total});
    }

    async findOneByFilter(filter?: PhoneTypeFilterDTO): Promise<ResultType<PhoneTypeEntity>> {
        const where = this.buildWhereClause(filter)

        const model: PhoneTypeModel | null = await PhoneTypeModel.findOne({
            where,
            order: [['id', 'ASC']],
        });

        return model ? ResultType.success(this.mapper.toEntity(model)) : ResultType.none();
    }

    async findById(id: number): Promise<ResultType<PhoneTypeEntity>> {
        const model: PhoneTypeModel | null = await PhoneTypeModel.findByPk(id);
        return model ? ResultType.success(this.mapper.toEntity(model)) : ResultType.none();
    }

    async update(entity: PhoneTypeEntity, transaction?: Transaction, model?: PhoneTypeModel): Promise<ResultType<boolean>> {
        const modelToUpdate = model ?? await PhoneTypeModel.findByPk(entity.id, {transaction});
        if (!modelToUpdate) return ResultType.failure(new Error("PhoneType not found"));

        modelToUpdate.description = entity.description;
        modelToUpdate.statusId = entity.statusId;
        await modelToUpdate.save({transaction});

        return ResultType.success(true);
    }

    private buildWhereClause(filters?: PhoneTypeFilterDTO): Partial<Record<keyof PhoneTypeDTO, any>> {
        const where: Partial<Record<keyof PhoneTypeDTO, any>> = {};

        if (filters == null) return where;

        if (filters.id !== undefined) where.id = filters.id;
        if (filters.description !== undefined) where.description = filters.description[0];
        if (filters.statusId !== undefined) where.statusId = filters.statusId;

        return where;
    }
}