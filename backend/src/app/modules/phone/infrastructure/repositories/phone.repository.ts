import {inject, injectable} from "tsyringe";
import {Transaction, WhereOptions} from "sequelize";
import {ResultType} from "@coreShared/types/result.type";
import {FindAllType} from "@coreShared/types/findAll.type";
import {SequelizeWhereBuilderUtil} from "@coreShared/utils/sequelizeWhereBuilder.util";
import {IPhoneRepository} from "@phone/infrastructure/repositories/interface/IPhone.repository";
import {PhoneDTO, PhoneFilterDTO} from "@phone/adapters/dtos/phone.dto";
import {PhoneMapper} from "@phone/infrastructure/mappers/phone.mapper";
import {PhoneEntity} from "@phone/domain/entities/phone.entity";
import {PhoneModel} from "@phone/infrastructure/models/phone.model";

@injectable()
export class PhoneRepository implements IPhoneRepository {
    constructor(
        @inject("PhoneMapper") private mapper: PhoneMapper,
    ) {
    }

    async create(entity: PhoneEntity, transaction?: Transaction): Promise<ResultType<PhoneEntity>> {
        const data = this.mapper.toPersistence(entity);
        const model: PhoneModel = await PhoneModel.create(data, {transaction});
        const restored: PhoneEntity = this.mapper.toEntity(model);

        return ResultType.success(restored);
    }

    async findMany(limit: number, offset: number, filters?: PhoneFilterDTO): Promise<ResultType<FindAllType<PhoneEntity>>> {
        const builder = new SequelizeWhereBuilderUtil<PhoneFilterDTO>(filters, {
            id: {in: true},
            number: {like: true},
            phoneCodeId: {in: true},
            phoneTypeId: {in: true},
            statusId: {in: true},
        });

        const where: WhereOptions = builder.build();

        const [models, total] = await Promise.all([
            PhoneModel.findAll({
                where,
                limit,
                offset,
                order: [['id', 'ASC']],
            }),
            PhoneModel.count({
                where,
            }),
        ]);

        const entities: PhoneEntity[] = models.map(model => this.mapper.toEntity(model))

        return ResultType.success({entities: entities, total: total});
    }

    async findOneByFilter(filter?: PhoneFilterDTO): Promise<ResultType<PhoneEntity>> {
        const where = this.buildWhereClause(filter)

        const model: PhoneModel | null = await PhoneModel.findOne({
            where,
            order: [['id', 'ASC']],
        });

        return model ? ResultType.success(this.mapper.toEntity(model)) : ResultType.none();
    }

    async findById(id: number): Promise<ResultType<PhoneEntity>> {
        const model: PhoneModel | null = await PhoneModel.findByPk(id);
        return model ? ResultType.success(this.mapper.toEntity(model)) : ResultType.none();
    }

    async update(entity: PhoneEntity, transaction?: Transaction, model?: PhoneModel): Promise<ResultType<boolean>> {
        const modelToUpdate = model ?? await PhoneModel.findByPk(entity.id, {transaction});
        if (!modelToUpdate) return ResultType.failure(new Error("Phone not found"));

        modelToUpdate.number = entity.number;
        modelToUpdate.phoneCodeId = entity.phoneCodeId;
        modelToUpdate.phoneTypeId = entity.phoneTypeId;
        modelToUpdate.statusId = entity.statusId;
        await modelToUpdate.save({transaction});

        return ResultType.success(true);
    }

    private buildWhereClause(filters?: PhoneFilterDTO): Partial<Record<keyof PhoneDTO, any>> {
        const where: Partial<Record<keyof PhoneDTO, any>> = {};

        if (filters == null) return where;

        if (filters.id !== undefined) where.id = filters.id;
        if (filters.number !== undefined) where.number = filters.number;
        if (filters.phoneCodeId !== undefined) where.phoneCodeId = filters.phoneCodeId;
        if (filters.phoneTypeId !== undefined) where.phoneTypeId = filters.phoneTypeId;
        if (filters.statusId !== undefined) where.statusId = filters.statusId;

        return where;
    }
}