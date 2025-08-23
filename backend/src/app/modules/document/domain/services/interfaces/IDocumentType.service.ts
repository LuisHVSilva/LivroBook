import {
    CreateDocumentTypeDTO,
    DocumentTypeFilterDTO,
    UpdateDocumentTypeDTO
} from "@document/adapters/dto/documentType.dto";
import {Transaction} from "sequelize";
import {DocumentTypeEntity} from "@document/domain/entities/documentType.entity";
import {UpdateResultType} from "@coreShared/types/crudResult.type";
import {FindAllType} from "@coreShared/types/findAll.type";
import {DeleteReport} from "@coreShared/utils/operationReport.util";
import {DeleteStatusEnum} from "@coreShared/enums/deleteStatus.enum";

export interface IDocumentTypeService {
    create(data: CreateDocumentTypeDTO, transaction: Transaction): Promise<DocumentTypeEntity>;

    getById(id: number): Promise<DocumentTypeEntity>

    findMany(filter?: DocumentTypeFilterDTO, page?: number, limit?: number): Promise<FindAllType<DocumentTypeEntity>>;

    update(newData: UpdateDocumentTypeDTO, transaction: Transaction): Promise<UpdateResultType<DocumentTypeEntity>>

    delete(id: number, transaction: Transaction): Promise<DeleteStatusEnum>;

    deleteMany(ids: number[], transaction: Transaction): Promise<DeleteReport>;
}