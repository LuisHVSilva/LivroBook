import {inject, injectable} from "tsyringe";
import {IDocumentTypeRepository} from "@document/infrastructure/repositories/interface/IDocumentType.repository";
import { DocumentTypeMapper } from "@document/infrastructure/mappers/documentType.mapper";
import {Transaction, WhereOptions} from "sequelize";
import {ResultType} from "@coreShared/types/result.type";
import {FindAllType} from "@coreShared/types/findAll.type";
import {SequelizeWhereBuilderUtil} from "@coreShared/utils/sequelizeWhereBuilder.util";
import {DocumentTypeEntity} from "@document/domain/entities/documentType.entity";
import {DocumentTypeModel} from "@document/infrastructure/models/documentType.model";
import {DocumentTypeDTO, DocumentTypeFilterDTO} from "@document/adapters/dto/documentType.dto";

@injectable()
export class DocumentTypeRepository implements IDocumentTypeRepository {
    constructor(
        @inject("DocumentTypeMapper") private  readonly mapper: DocumentTypeMapper,
    ) {
    }

    async create(entity: DocumentTypeEntity, transaction?: Transaction): Promise<ResultType<DocumentTypeEntity>> {
        const data = this.mapper.toPersistence(entity);
        const model: DocumentTypeModel = await DocumentTypeModel.create(data, {transaction});
        const restored: DocumentTypeEntity = this.mapper.toEntity(model);

        return ResultType.success(restored);
    }

    async findById(id: number): Promise<ResultType<DocumentTypeEntity>> {
        const model: DocumentTypeModel | null = await DocumentTypeModel.findByPk(id);
        return model ? ResultType.success(this.mapper.toEntity(model)) : ResultType.none();
    }

    async findOneByFilter(filters?: DocumentTypeFilterDTO): Promise<ResultType<DocumentTypeEntity>> {
        const where: Partial<Record<keyof DocumentTypeDTO, any>> = this.buildWhereClause(filters);

        const model = await DocumentTypeModel.findOne({
            where,
            order: [['id', 'ASC']],
        });

        return model ? ResultType.success(this.mapper.toEntity(model)) : ResultType.none();
    }

    async findMany(limit: number, offset: number, filters?: DocumentTypeFilterDTO): Promise<ResultType<FindAllType<DocumentTypeEntity>>> {
        const builder = new SequelizeWhereBuilderUtil<DocumentTypeFilterDTO>(filters, {
            id: {in: true},
            description: {like: true},
        });

        const where: WhereOptions = builder.build();

        const [models, total] = await Promise.all([
            DocumentTypeModel.findAll({
                where,
                limit,
                offset,
                order: [['id', 'ASC']],
            }),
            DocumentTypeModel.count({
                where,
            }),
        ]);

        const entities: DocumentTypeEntity[] = models.map(model => this.mapper.toEntity(model))

        return ResultType.success({entities: entities, total: total});
    }

    async update(entity: DocumentTypeEntity, transaction?: Transaction, model?: DocumentTypeModel): Promise<ResultType<boolean>> {
        const modelToUpdate = model ?? await DocumentTypeModel.findByPk(entity.id, {transaction});
        if (!modelToUpdate) return ResultType.failure(new Error("Document Type not found"));
        modelToUpdate.description = entity.description;
        modelToUpdate.statusId = entity.statusId;
        modelToUpdate.statusId = entity.statusId;
        await modelToUpdate.save({transaction});
        return ResultType.success(true);
    }

    private buildWhereClause(filters?: DocumentTypeFilterDTO): Partial<Record<keyof DocumentTypeDTO, any>> {
        const where: Partial<Record<keyof DocumentTypeDTO, any>> = {};

        if (filters == null) return where;

        if (filters.id !== undefined) where.id = filters.id;
        if (filters.description !== undefined) where.description = filters.description;
        if (filters.countryId !== undefined) where.countryId = filters.countryId;
        if (filters.statusId !== undefined) where.statusId = filters.statusId;

        return where;
    }
}