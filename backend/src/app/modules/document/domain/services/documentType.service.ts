import {inject, injectable} from "tsyringe";
import {IDocumentTypeService} from "@document/domain/services/interfaces/IDocumentType.service";
import {IDocumentTypeRepository} from "@document/infrastructure/repositories/interface/IDocumentType.repository";
import {EntityUniquenessValidator} from "@coreShared/validators/entityUniqueness.validator";
import {EntityUniquenessValidatorFactory} from "@coreShared/factories/entityUniquenessValidator.factory";
import {IRepositoryBase} from "@coreShared/base/interfaces/IRepositoryBase";
import {DocumentTypeEntity} from "@document/domain/entities/documentType.entity";
import {LogError} from "@coreShared/decorators/LogError";
import {DocumentTypeTransform} from "@document/domain/transformers/documentType.transform";
import {ConflictError} from "@coreShared/errors/domain.error";
import {EntitiesMessage} from "@coreShared/messages/entities.message";
import {IStatusService} from "@status/domain/services/interfaces/IStatus.service";
import {ICountryService} from "@location/domain/services/interfaces/ICountry.service";
import {ServiceBase} from "@coreShared/base/service.base";
import {DocumentTypeBaseRepositoryType, DocumentTypeDtoBaseType} from "@document/adapters/dto/documentType.dto";
import {CountryTransformer} from "@location/domain/transformers/country.transform";
import {StatusTransformer} from "@status/domain/transformers/Status.transformer";
import {StringUtil} from "@coreShared/utils/string.util";

@injectable()
export class DocumentTypeService extends ServiceBase<DocumentTypeDtoBaseType, DocumentTypeEntity> implements IDocumentTypeService {
    //#region PROPERTIES
    private readonly uniquenessValidator: EntityUniquenessValidator<DocumentTypeBaseRepositoryType>;
    private readonly DOCUMENT_TYPE: string = DocumentTypeEntity.ENTITY_NAME;
    //#endregion

    //#region CONSTRUCTOR
    constructor(
        @inject("IDocumentTypeRepository")
        protected readonly repo: IDocumentTypeRepository,
        @inject("EntityUniquenessValidatorFactory")
        private readonly validatorFactory: EntityUniquenessValidatorFactory,
        @inject("DocumentTypeRepository")
        private readonly documentTypeRepo: IRepositoryBase<DocumentTypeBaseRepositoryType>,
        @inject('IStatusService')
        protected readonly statusService: IStatusService,
        @inject("ICountryService")
        private readonly countryService: ICountryService,
    ) {
        super(repo, DocumentTypeEntity, statusService)
        this.uniquenessValidator = this.validatorFactory(this.documentTypeRepo);
    }

    //#endregion

    //#region HELPERS
    @LogError()
    protected async createEntity(data: DocumentTypeDtoBaseType["CreateDTO"], status: string): Promise<DocumentTypeEntity> {
        return DocumentTypeEntity.create({
            description: data.description,
            country: data.country,
            status
        });
    }

    @LogError()
    protected async uniquenessValidatorEntity(entity: DocumentTypeEntity, previousEntity?: DocumentTypeEntity): Promise<void> {
        const isUnique: boolean = await this.uniquenessValidator.validate('description', entity.description, previousEntity);

        if (!isUnique) throw new ConflictError(EntitiesMessage.error.conflict.duplicateValue(this.DOCUMENT_TYPE, 'description'));
    }

    @LogError()
    protected filterTransform(input: DocumentTypeDtoBaseType["FilterDTO"]): DocumentTypeDtoBaseType["FilterDTO"] {
        return StringUtil.applyFilterTransform(input, {
            description: DocumentTypeTransform.normalizeDescription,
            country: CountryTransformer.normalizeDescription,
            status: StatusTransformer.normalizeDescription,
        });
    }

    @LogError()
    protected async validateForeignKeys(data: Partial<DocumentTypeDtoBaseType["DTO"]>): Promise<void> {
        await Promise.all([
            this.validateExistence("country", data.country, 'description', this.countryService),
            this.validateStatusExistence(data.status)
        ]);
    }

    //#endregion
}