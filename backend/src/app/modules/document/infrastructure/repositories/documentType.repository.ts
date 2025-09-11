import {inject, injectable} from "tsyringe";
import {IDocumentTypeRepository} from "@document/infrastructure/repositories/interface/IDocumentType.repository";
import {
    DocumentTypeBaseRepositoryType,
    DocumentTypeFilterDTO,
    DocumentTypePersistenceDTO
} from "@document/adapters/dto/documentType.dto";
import {RepositoryBase} from "@coreShared/base/repository.base";
import {ModelStatic} from "sequelize";
import {DocumentTypeModel} from "@document/infrastructure/models/documentType.model";
import {DocumentTypeEntity} from "@document/domain/entities/documentType.entity";
import {SequelizeWhereBuilderUtil} from "@coreShared/utils/sequelizeWhereBuilder.util";

@injectable()
export class DocumentTypeRepository extends RepositoryBase<DocumentTypeBaseRepositoryType> implements IDocumentTypeRepository {
    constructor(
        @inject("DocumentTypeModel") model: ModelStatic<DocumentTypeModel>,
    ) {
        super(model);
    }

    protected override makeFilter(filters?: DocumentTypeFilterDTO): SequelizeWhereBuilderUtil<DocumentTypeFilterDTO> {
        return super.makeFilter(filters, {
            id: {in: true},
            description: {like: true},
        });
    }


    protected toPersistence(entity: DocumentTypeEntity): DocumentTypePersistenceDTO {
        return {
            description: entity.description,
            countryId: entity.countryId,
            statusId: entity.statusId,
        };
    }

    protected toEntity(model: DocumentTypeModel): DocumentTypeEntity {
        return DocumentTypeEntity.create({
            id: model.id,
            description: model.description,
            countryId: model.countryId,
            statusId: model.statusId,
        });
    }
}