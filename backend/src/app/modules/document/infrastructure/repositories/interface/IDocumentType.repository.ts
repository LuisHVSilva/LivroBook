import {IRepositoryBase} from "@coreShared/base/interfaces/IRepositoryBase";
import {DocumentTypeEntity} from "@document/domain/entities/documentType.entity";
import {DocumentTypeModel} from "@document/infrastructure/models/documentType.model";
import {DocumentTypeFilterDTO} from "@document/adapters/dto/documentType.dto";
import {BaseRepositoryType} from "@coreShared/types/entity.type";


export type DocumentTypePersistenceDTO = {
    description: string;
    countryId: number;
    statusId: number;
};

export type DocumentTypeBaseRepositoryType = BaseRepositoryType<
    DocumentTypeModel,
    DocumentTypeEntity,
    DocumentTypeFilterDTO,
    DocumentTypePersistenceDTO
>;

export interface IDocumentTypeRepository extends IRepositoryBase<DocumentTypeBaseRepositoryType> {
}