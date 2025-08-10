import {BaseInfrastructureMapper} from "@coreShared/base/baseInfrastructureMapper";
import {DocumentTypeEntity} from "@document/domain/entities/documentType.entity";
import {DocumentTypeModel} from "@document/infrastructure/models/documentType.model";

type DocumentTypePersistenceDTO = {
    description: string;
    countryId: number;
    statusId: number;
};

export class DocumentTypeMapper implements BaseInfrastructureMapper<DocumentTypeEntity, DocumentTypeModel, DocumentTypePersistenceDTO>{
    toPersistence(entity: DocumentTypeEntity): DocumentTypePersistenceDTO {
        return {
            description: entity.description,
            countryId: entity.countryId,
            statusId: entity.statusId,
        };
    }

    toEntity(model: DocumentTypeModel): DocumentTypeEntity {
        return DocumentTypeEntity.create({
            id: model.id,
            description: model.description,
            countryId: model.countryId,
            statusId: model.statusId,
        });
    }
}
