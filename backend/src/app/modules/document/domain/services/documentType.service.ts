import {inject, injectable} from "tsyringe";
import {IDocumentTypeService} from "@document/domain/services/interfaces/IDocumentType.service";
import {IDocumentTypeRepository} from "@document/infrastructure/repositories/interface/IDocumentType.repository";
import {EntityUniquenessValidator} from "@coreShared/validators/entityUniqueness.validator";
import {EntityUniquenessValidatorFactory} from "@coreShared/factories/entityUniquenessValidator.factory";
import {IRepositoryBase} from "@coreShared/base/interfaces/IRepositoryBase";
import {DocumentTypeEntity} from "@document/domain/entities/documentType.entity";
import {LogError} from "@coreShared/decorators/LogError";
import {DocumentTypeTransform} from "@document/domain/transformers/documentType.transform";
import {ConflictError, NotFoundError} from "@coreShared/errors/domain.error";
import {EntitiesMessage} from "@coreShared/messages/entities.message";
import {IStatusService} from "@status/domain/services/interfaces/IStatus.service";
import {ICountryService} from "@location/domain/services/interfaces/ICountry.service";
import {ServiceBase} from "@coreShared/base/service.base";
import {DocumentTypeBaseRepositoryType, DocumentTypeDtoBaseType} from "@document/adapters/dto/documentType.dto";

@injectable()
export class DocumentTypeService extends ServiceBase<DocumentTypeDtoBaseType, DocumentTypeEntity> implements IDocumentTypeService {
    //#region PROPERTIES
    private readonly uniquenessValidator: EntityUniquenessValidator<DocumentTypeBaseRepositoryType>;
    private readonly DOCUMENT_TYPE: string = DocumentTypeEntity.ENTITY_NAME;
    //#endregion

    //#region CONSTRUCTOR
    constructor(
        @inject("IDocumentTypeRepository") protected readonly repo: IDocumentTypeRepository,
        @inject("EntityUniquenessValidatorFactory") private readonly validatorFactory: EntityUniquenessValidatorFactory,
        @inject("DocumentTypeRepository") private readonly documentTypeRepo: IRepositoryBase<DocumentTypeBaseRepositoryType>,
        @inject('IStatusService') protected readonly statusService: IStatusService,
        @inject("ICountryService") private readonly countryService: ICountryService,
    ) {
        super(repo, DocumentTypeEntity, statusService)
        this.uniquenessValidator = this.validatorFactory(this.documentTypeRepo);
    }

    //#endregion

    //#region HELPERS
    @LogError()
    protected async createEntity(data: DocumentTypeDtoBaseType["CreateDTO"], statusId: number): Promise<DocumentTypeEntity> {
        return DocumentTypeEntity.create({
            description: data.description,
            countryId: data.countryId,
            statusId
        });
    }

    @LogError()
    protected async uniquenessValidatorEntity(entity: DocumentTypeEntity): Promise<void> {
        const isUnique: boolean = await this.uniquenessValidator.validate('description', entity.description);

        if (!isUnique) throw new ConflictError(EntitiesMessage.error.conflict.duplicateValue(this.DOCUMENT_TYPE, 'description'));
    }

    @LogError()
    protected filterTransform(input: DocumentTypeDtoBaseType['FilterDTO']): DocumentTypeDtoBaseType['FilterDTO'] {
        const transformedFilter: DocumentTypeDtoBaseType['FilterDTO'] = {...input};

        if (input.description !== undefined) {
            transformedFilter.description = input.description.map(desc =>
                DocumentTypeTransform.normalizeDescription(desc)
            );
        }

        return transformedFilter;
    }

    @LogError()
    protected async validateForeignKeys(data: Partial<DocumentTypeDtoBaseType["DTO"]>): Promise<void> {
        const validateExistence = async <T>(
            field: keyof DocumentTypeDtoBaseType["DTO"],
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

    @LogError()
    protected async handleBusinessRules(oldEntity: DocumentTypeEntity, newEntity: DocumentTypeEntity): Promise<void> {
        if (newEntity.description !== oldEntity.description) {
            await this.uniquenessValidatorEntity(newEntity);
        }
    }

    //#endregion
}