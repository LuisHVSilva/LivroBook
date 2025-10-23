import {inject, injectable} from "tsyringe";
import {IDocumentTypeRepository} from "@document/infrastructure/repositories/interface/IDocumentType.repository";
import {DocumentTypeBaseRepositoryType} from "@document/adapters/dto/documentType.dto";
import {RepositoryBase} from "@coreShared/base/repository.base";
import {FindOptions, InferCreationAttributes, ModelStatic} from "sequelize";
import {DocumentTypeModel} from "@document/infrastructure/models/documentType.model";
import {DocumentTypeEntity} from "@document/domain/entities/documentType.entity";
import {RelationMapType} from "@coreShared/types/controller.type";
import {IStatusRepository} from "@status/infrastructure/repositories/IStatusRepository";
import {ICountryRepository} from "@location/infrastructure/repositories/interfaces/ICountry.repository";
import {NotFoundError} from "@coreShared/errors/classes.error";

@injectable()
export class DocumentTypeRepository extends RepositoryBase<DocumentTypeBaseRepositoryType> implements IDocumentTypeRepository {
    constructor(
        @inject("DocumentTypeModel")
        model: ModelStatic<DocumentTypeModel>,
        @inject("ICountryRepository")
        private countryRepository: ICountryRepository,
        @inject("IStatusRepository")
        protected readonly statusRepository: IStatusRepository,
    ) {
        super(model);
    }

    protected getIncludes(): FindOptions['include'] {
        return [
            {
                association: DocumentTypeModel.associations.country,
                attributes: ['id', 'description'],
            },
            {
                association: DocumentTypeModel.associations.status,
                attributes: ['id', 'description'],
            },

        ];
    }

    protected associationMap(): Partial<Record<keyof DocumentTypeBaseRepositoryType["Filter"], string>> {
        return {
            country: 'country.description',
            status: 'status.description',
        };
    }

    protected filter(): Partial<Record<keyof DocumentTypeBaseRepositoryType["Filter"], {
        in?: boolean;
        like?: boolean
    }>> | undefined {
        return {
            id: {in: true},
            description: {like: true},
            country: {like: true},
            status: {like: true},
        };
    }

    protected async toPersistence(entity: DocumentTypeBaseRepositoryType["Entity"]): Promise<InferCreationAttributes<DocumentTypeModel>> {
        const relationData = {
            country: entity.country,
            status: entity.status,
        }

        const relations: RelationMapType = {
            country: {idField: 'countryId', filterField: 'description', repo: this.countryRepository},
            status: {idField: 'statusId', filterField: 'description', repo: this.statusRepository},
        }

        const normalized = await this.normalizeRelations(relationData, relations);

        return {
            id: entity.id,
            description: entity.description,
            countryId: normalized.countryId,
            statusId: normalized.statusId
        };
    }

    protected async toEntity(model: DocumentTypeModel): Promise<DocumentTypeEntity> {
        const normalized = await this.normalizeEntityStatus(model);

        if (!normalized.country?.description) {
            throw new NotFoundError('Sem pais associado para o estado');
        }

        return DocumentTypeEntity.create({
            id: normalized.id,
            description: normalized.description,
            country: normalized.country.description,
            status: normalized.status,
        });
    }
}