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
import {UpdateResultType} from "@coreShared/types/crudResult.type";
import {LogError} from "@coreShared/decorators/LogError";
import {DocumentTypeTransform} from "@document/domain/transformers/documentType.transform";
import {ResultType} from "@coreShared/types/result.type";
import {ConflictError, NotFoundError} from "@coreShared/errors/domain.error";
import {EntitiesMessage} from "@coreShared/messages/entities.message";
import {FindAllType} from "@coreShared/types/findAll.type";
import {StringUtil} from "@coreShared/utils/string.util";
import {ServiceError} from "@coreShared/errors/service.error";
import {IStatusService} from "@status/domain/services/interfaces/IStatus.service";
import {DeleteStatusEnum} from "@coreShared/enums/deleteStatus.enum";
import {DeleteReport} from "@coreShared/utils/operationReport.util";
import {ICountryService} from "@location/domain/services/interfaces/ICountry.service";

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
        @inject("ICountryService") private readonly countryService: ICountryService,
    ) {
        this.uniquenessValidator = validatorFactory(documentTypeRepository);
    }

    //#endregion

    //#region CREATE
    @LogError()
    async create(data: CreateDocumentTypeDTO, transaction: Transaction): Promise<DocumentTypeEntity> {
        const status: StatusEntity = await this.statusService.getStatusForNewEntities();
        const statusId: number = status.id!;

        const entity: DocumentTypeEntity = DocumentTypeEntity.create({
            description: data.description,
            countryId: data.countryId,
            statusId: statusId
        });

        await this.validateForeignKeys(entity);

        const isUnique: boolean = await this.uniquenessValidator.validate('description', entity.description);

        if (!isUnique) throw new ConflictError(EntitiesMessage.error.conflict.duplicateValue(this.DOCUMENT_TYPE, 'description'));

        return (await this.repo.create(entity, transaction)).unwrapOrThrow();
    }

    //#endregion

    //#region READ
    @LogError()
    async getById(id: number): Promise<DocumentTypeEntity> {
        const found: ResultType<DocumentTypeEntity> = await this.repo.findById(id);
        const entity: DocumentTypeEntity | null = found.unwrapOrNull();

        if (!entity) throw new NotFoundError(EntitiesMessage.error.retrieval.notFound(this.DOCUMENT_TYPE));

        return entity;
    }

    @LogError()
    async findMany(filter?: DocumentTypeFilterDTO, page?: number, limit?: number): Promise<FindAllType<DocumentTypeEntity>> {
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

    //#endregion

    //#region UPDATE
    @LogError()
    async update(newData: UpdateDocumentTypeDTO, transaction: Transaction): Promise<UpdateResultType<DocumentTypeEntity>> {
        const entity: DocumentTypeEntity = await this.getById(newData.id);

        const updatedProps: Partial<DocumentTypeDTO> = {
            description: newData.description ?? entity.description,
            countryId: newData.countryId ?? entity.countryId,
            statusId: newData.statusId ?? entity.statusId,
        };

        let updatedEntity: DocumentTypeEntity = entity.updateProps(updatedProps);

        await this.validateForeignKeys(updatedEntity);

        if (updatedEntity.isEqual(entity)) {
            return {entity: entity, updated: false};
        }

        if (updatedEntity.hasDifferencesExceptStatus(entity)) {
            if (newData.description !== entity.description) {
                const isUnique: boolean = await this.uniquenessValidator.validate('description', newData.description!);
                if (!isUnique) {
                    throw new ConflictError(EntitiesMessage.error.conflict.duplicateValue(this.DOCUMENT_TYPE, this.DESCRIPTION));
                }
            }

            const updatedStatusId: number = (await this.statusService.getStatusForNewEntities()).id!;
            updatedEntity = updatedEntity.updateProps({statusId: updatedStatusId});
        }

        const updated: ResultType<boolean> = await this.repo.update(updatedEntity, transaction);
        if (!updated.isSuccess()) {
            throw new ServiceError(EntitiesMessage.error.failure.update(this.DOCUMENT_TYPE));
        }

        return {entity: updatedEntity, updated: true};
    }

    //#endregion

    //#region DELETE
    @LogError()
    async delete(id: number, transaction: Transaction): Promise<DeleteStatusEnum> {
        let entity: DocumentTypeEntity;

        try {
            entity = await this.getById(id);
        } catch (error) {
            if (error instanceof NotFoundError) {
                return DeleteStatusEnum.NOT_FOUND;
            }
            throw error;
        }

        const inactiveStatus: StatusEntity = await this.statusService.getStatusForInactiveEntities();

        if (entity.statusId === inactiveStatus.id) {
            return DeleteStatusEnum.ALREADY_INACTIVE;
        }

        const deletedEntity = entity.updateProps({statusId: inactiveStatus.id});
        await this.repo.update(deletedEntity, transaction);

        return DeleteStatusEnum.DELETED;
    }

    @LogError()
    async deleteMany(ids: number[], transaction: Transaction): Promise<DeleteReport> {
        const deleted: number[] = [];
        const alreadyInactive: number[] = [];
        const notFound: number[] = [];

        for (const id of ids) {
            const deleteEntityResult: DeleteStatusEnum = await this.delete(id, transaction);

            switch (deleteEntityResult) {
                case DeleteStatusEnum.DELETED:
                    deleted.push(id);
                    break;
                case DeleteStatusEnum.ALREADY_INACTIVE:
                    alreadyInactive.push(id);
                    break;
                default:
                    notFound.push(id);
                    break;
            }
        }

        return {deleted, alreadyInactive, notFound};
    }

    //#endregion

    @LogError()
    private async validateForeignKeys(data: Partial<DocumentTypeDTO>): Promise<void> {
        const validateExistence = async <T>(
            field: keyof DocumentTypeDTO,
            id: number | undefined,
            service: { getById: (id: number) => Promise<T | null> }
        ): Promise<void> => {
            if (id == null) return;
            if (!(await service.getById(id))) {
                throw new NotFoundError(EntitiesMessage.error.retrieval.notFoundForeignKey(field, id));
            }
        };

        await Promise.all([
            validateExistence("countryId", data.countryId, this.countryService),
            validateExistence("statusId", data.statusId, this.statusService)
        ]);
    }
}