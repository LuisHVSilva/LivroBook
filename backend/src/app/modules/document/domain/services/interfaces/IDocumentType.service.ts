import {
    CreateDocumentTypeDTO,
    DocumentTypeFilterDTO,
    UpdateDocumentTypeDTO
} from "@document/adapters/dto/documentType.dto";
import {Transaction} from "sequelize";
import {DocumentTypeEntity} from "@document/domain/entities/documentType.entity";
import {CreateResultType} from "@coreShared/types/crudResult.type";
import {FindAllType} from "@coreShared/types/findAll.type";

export interface IDocumentTypeService {
    create(data: CreateDocumentTypeDTO, transaction: Transaction): Promise<CreateResultType<DocumentTypeEntity>>;
    getOneByFilter(filter: DocumentTypeFilterDTO): Promise<DocumentTypeEntity | null>
    getAll(filter?: DocumentTypeFilterDTO, page?: number, limit?: number): Promise<FindAllType<DocumentTypeEntity>>;
    getById(id: number): Promise<DocumentTypeEntity | null>
    update(newData: UpdateDocumentTypeDTO, transaction: Transaction): Promise<DocumentTypeEntity>
    delete(id: number, transaction: Transaction): Promise<void>;
}