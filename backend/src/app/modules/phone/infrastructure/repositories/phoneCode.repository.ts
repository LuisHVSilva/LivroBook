import {inject, injectable} from "tsyringe";
import {PhoneCodeMapper} from "@phone/infrastructure/mappers/phoneCode.mapper";
import {PhoneCodeEntity} from "@phone/domain/entities/phoneCode.entity";
import {Transaction, WhereOptions} from "sequelize";
import {ResultType} from "@coreShared/types/result.type";
import {PhoneCodeModel} from "@phone/infrastructure/models/phoneCode.model";
import {PhoneCodeDTO, PhoneCodeFilterDTO} from "@phone/adapters/dtos/phoneCode.dto";
import {FindAllType} from "@coreShared/types/findAll.type";
import {SequelizeWhereBuilderUtil} from "@coreShared/utils/sequelizeWhereBuilder.util";
import {IPhoneCodeRepository} from "@phone/infrastructure/repositories/interface/IPhoneCode.repository";


@injectable()
export class PhoneCodeRepository implements IPhoneCodeRepository {
    constructor(
        @inject("PhoneCodeMapper") private mapper: PhoneCodeMapper,
    ) {
    }

    async create(entity: PhoneCodeEntity, transaction?: Transaction): Promise<ResultType<PhoneCodeEntity>> {
        const data = this.mapper.toPersistence(entity);
        const model: PhoneCodeModel = await PhoneCodeModel.create(data, {transaction});
        const restored: PhoneCodeEntity = this.mapper.toEntity(model);

        return ResultType.success(restored);
    }

    async findMany(limit: number, offset: number, filters?: PhoneCodeFilterDTO): Promise<ResultType<FindAllType<PhoneCodeEntity>>> {
        const builder = new SequelizeWhereBuilderUtil<PhoneCodeFilterDTO>(filters, {
            id: { in: true },
            dddCode: { like: true },
            ddiCode: { like: true },
            stateId: { in: true },
            statusId: { in: true },
        });

        const where: WhereOptions = builder.build();

        const [models, total] = await Promise.all([
            PhoneCodeModel.findAll({
                where,
                limit,
                offset,
                order: [['id', 'ASC']],
            }),
            PhoneCodeModel.count({
                where,
            }),
        ]);

        const entities: PhoneCodeEntity[] = models.map(model => this.mapper.toEntity(model))

        return ResultType.success({entities: entities, total: total});
    }

    async findOneByFilter(filter?: PhoneCodeFilterDTO): Promise<ResultType<PhoneCodeEntity>> {
        const where = this.buildWhereClause(filter)

        const model: PhoneCodeModel | null = await PhoneCodeModel.findOne({
            where,
            order: [['id', 'ASC']],
        });

        return model ? ResultType.success(this.mapper.toEntity(model)) : ResultType.none();
    }

    async findById(id: number): Promise<ResultType<PhoneCodeEntity>> {
        const model: PhoneCodeModel | null = await PhoneCodeModel.findByPk(id);
        return model ? ResultType.success(this.mapper.toEntity(model)) : ResultType.none();
    }

    async update(entity: PhoneCodeEntity, transaction?: Transaction, model?: PhoneCodeModel): Promise<ResultType<boolean>> {
        const modelToUpdate = model ?? await PhoneCodeModel.findByPk(entity.id, {transaction});
        if (!modelToUpdate) return ResultType.failure(new Error("PhoneCode not found"));

        modelToUpdate.ddiCode = entity.ddiCode;
        modelToUpdate.dddCode = entity.dddCode;
        modelToUpdate.stateId = entity.stateId;
        modelToUpdate.statusId = entity.statusId;
        await modelToUpdate.save({transaction});

        return ResultType.success(true);
    }

    private buildWhereClause(filters?: PhoneCodeFilterDTO): Partial<Record<keyof PhoneCodeDTO, any>> {
        const where: Partial<Record<keyof PhoneCodeDTO, any>> = {};

        if (filters == null) return where;

        if (filters.id !== undefined) where.id = filters.id;
        if (filters.ddiCode !== undefined) where.ddiCode = filters.ddiCode;
        if (filters.dddCode !== undefined) where.dddCode = filters.dddCode;
        if (filters.stateId !== undefined) where.stateId = filters.stateId;
        if (filters.statusId !== undefined) where.statusId = filters.statusId;

        return where;
    }
}