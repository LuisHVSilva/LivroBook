import {inject, injectable} from "tsyringe";
import {IDocumentTypeService} from "@document/domain/services/interfaces/IDocumentType.service";
import {IDocumentTypeRepository} from "@document/infrastructure/repositories/interface/IDocumentType.repository";
import {EntityUniquenessValidator} from "@coreShared/validators/entityUniqueness.validator";
import {EntityUniquenessValidatorFactory} from "@coreShared/factories/entityUniquenessValidator.factory";
import {IBaseRepository} from "@coreShared/interfaces/IBaseRepository";
import {DocumentTypeEntity} from "@document/domain/entities/documentType.entity";
import {DocumentTypeModel} from "@document/infrastructure/models/documentType.model";
import {
    CreateDocumentTypeDTO,
    DocumentTypeDTO,
    DocumentTypeFilterDTO,
    UpdateDocumentTypeDTO
} from "@document/adapters/dto/documentType.dto";
import {Transaction} from "sequelize";
import {StatusEntity} from "@status/domain/entities/status.entity";
import {CreateResultType} from "@coreShared/types/crudResult.type";
import {LogError} from "@coreShared/decorators/LogError";
import {DocumentTypeTransform} from "@document/domain/transformers/documentType.transform";
import {ResultType} from "@coreShared/types/result.type";
import {ConflictError, NotFoundError} from "@coreShared/errors/domain.error";
import {EntitiesMessage} from "@coreShared/messages/entities.message";
import {FindAllType} from "@coreShared/types/findAll.type";
import {StringUtil} from "@coreShared/utils/string.util";
import {ServiceError} from "@coreShared/errors/service.error";
import {IStatusService} from "@status/domain/services/interfaces/IStatus.service";

@injectable()
export class DocumentTypeService implements IDocumentTypeService {
    //#region PROPERTIES
    private readonly uniquenessValidator: EntityUniquenessValidator<DocumentTypeEntity, DocumentTypeModel, DocumentTypeDTO>;
    private readonly DESCRIPTION: string = 'description';
    private readonly DOCUMENT_TYPE: string = DocumentTypeEntity.ENTITY_NAME;
    //#endregion

    //#region CONSTRUCTOR
    constructor(
        @inject("IDocumentTypeRepository") private readonly repo: IDocumentTypeRepository,
        @inject("EntityUniquenessValidatorFactory") validatorFactory: EntityUniquenessValidatorFactory,
        @inject("DocumentTypeRepository") documentTypeRepository: IBaseRepository<DocumentTypeEntity, DocumentTypeModel, DocumentTypeDTO>,
        @inject('IStatusService') private readonly statusService: IStatusService,
    ) {
        this.uniquenessValidator = validatorFactory(documentTypeRepository);
    }
    //#endregion

    @LogError()
    async create(data: CreateDocumentTypeDTO, transaction: Transaction): Promise<CreateResultType<DocumentTypeEntity>> {
        const status: StatusEntity = await this.statusService.getStatusForNewEntities();
        const statusId: number = status.id!;

        const entity: DocumentTypeEntity = DocumentTypeEntity.create({
            description: data.description,
            countryId: data.countryId,
            statusId: statusId
        });

        const isUnique: boolean = await this.uniquenessValidator.validate('description', entity.description);

        if (!isUnique) {
            throw new ConflictError(EntitiesMessage.error.conflict.duplicateValue(this.DOCUMENT_TYPE, 'description'));
        }

        const created: DocumentTypeEntity = (await this.repo.create(entity, transaction)).unwrapOrThrow();

        return {entity: created, created: true};
    }

    @LogError()
    async getOneByFilter(filter: DocumentTypeFilterDTO): Promise<DocumentTypeEntity | null> {
        if (filter.description) {
            filter.description = DocumentTypeTransform.normalizeDescription(filter.description[0]);
        }

        const found: ResultType<DocumentTypeEntity | null> = await this.repo.findOneByFilter(filter);

        if (!found.isSuccess()) throw new NotFoundError(EntitiesMessage.error.retrieval.notFound(this.DOCUMENT_TYPE));

        return found.unwrapOrNull();
    }

    @LogError()
    async getAll(filter?: DocumentTypeFilterDTO, page?: number, limit?: number): Promise<FindAllType<DocumentTypeEntity>> {
        const pageValue: number = page ?? 1;
        const limitValue: number = limit ?? 20;
        const offset: number = (pageValue - 1) * limitValue;

        if (filter?.description) {
            filter.description = StringUtil.toArray(filter.description).map(DocumentTypeTransform.normalizeDescription);
        }

        const found: ResultType<FindAllType<DocumentTypeEntity>> = await this.repo.findMany(limitValue, offset, filter);

        if (!found.isSuccess()) throw new NotFoundError(EntitiesMessage.error.retrieval.notFound(this.DOCUMENT_TYPE));

        return found.unwrap();
    }

    @LogError()
    async getById(id: number): Promise<DocumentTypeEntity | null> {
        return (await this.repo.findById(id)).unwrapOrNull() ?? null;
    }

    @LogError()
    async update(newData: UpdateDocumentTypeDTO, transaction: Transaction): Promise<DocumentTypeEntity> {
        const entityFound: DocumentTypeEntity | null = await this.getById(newData.id);

        if (!entityFound) throw new NotFoundError(EntitiesMessage.error.retrieval.notFound(this.DOCUMENT_TYPE));

        let updatedEntity: DocumentTypeEntity = entityFound.updateProps({
            description: newData.newDescription ?? entityFound.description,
            countryId: newData.newCountryId ?? entityFound.countryId,
            statusId: newData.newStatusId ?? entityFound.statusId,
        });

        if (newData.newDescription && entityFound.description !== newData.newDescription) {
            const isUnique: boolean = await this.uniquenessValidator.validate('description', newData.newDescription);
            if (!isUnique) {
                throw new ConflictError(EntitiesMessage.error.conflict.duplicateValue(this.DOCUMENT_TYPE, this.DESCRIPTION));
            }
        }

        if(newData.newDescription || newData.newCountryId) {
            const updatedStatusId: number = (await this.statusService.getStatusForNewEntities()).id!;
            updatedEntity = updatedEntity.updateProps({ statusId: updatedStatusId});
        }

        const updated: ResultType<boolean> = await this.repo.update(updatedEntity, transaction);

        if (!updated.isSuccess() || (updated.isSuccess()) && !updated.unwrap()) {
            throw new ServiceError(EntitiesMessage.error.failure.update(this.DOCUMENT_TYPE));
        }

        return updatedEntity;
    }

    @LogError()
    async delete(id: number, transaction: Transaction): Promise<void> {
        const entity: DocumentTypeEntity | null = await this.getById(id);
        if (!entity)  throw new NotFoundError(EntitiesMessage.error.retrieval.notFound(this.DOCUMENT_TYPE));

        const inactiveStatus: StatusEntity = await this.statusService.getStatusForInactiveEntities();

        if(entity.statusId === inactiveStatus.id) return;

        const deletedEntity: DocumentTypeEntity = entity.updateProps({ statusId: inactiveStatus.id });
        await this.repo.update(deletedEntity, transaction);
    }
}