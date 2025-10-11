import {ICountryRepository} from "@location/infrastructure/repositories/interfaces/ICountry.repository";
import {inject, injectable} from "tsyringe";
import {FindOptions, InferCreationAttributes, ModelStatic} from "sequelize";
import {CountryEntity} from "@location/domain/entities/country.entity";
import {CountryModel} from "@location/infrastructure/models/country.model";
import {CountryBaseRepositoryType} from "@location/adapters/dtos/country.dto";
import {RepositoryBase} from "@coreShared/base/repository.base";
import {RelationMapType} from "@coreShared/types/controller.type";
import {IStatusRepository} from "@status/infrastructure/repositories/IStatusRepository";

@injectable()
export class CountryRepository extends RepositoryBase<CountryBaseRepositoryType> implements ICountryRepository {
    constructor(
        @inject("CountryModel")
        model: ModelStatic<CountryModel>,
        @inject("IStatusRepository")
        protected readonly statusRepository: IStatusRepository,
    ) {
        super(model, statusRepository);
    }

    protected getIncludes(): FindOptions['include'] {
        return [
            {
                association: CountryModel.associations.status,
                attributes: ['id', 'description'],
            }
        ];
    }

    protected associationMap(): Partial<Record<keyof CountryBaseRepositoryType["Filter"], string>> {
        return {
            status: 'status.description',
        };
    }

    protected filter(): Partial<Record<keyof CountryBaseRepositoryType["Filter"], {
        in?: boolean;
        like?: boolean
    }>> | undefined {
        return {
            id: {in: true},
            description: {like: true},
            status: {like: true},
        };
    }

    protected async toPersistence(
        entity: CountryBaseRepositoryType["Entity"]
    ): Promise<InferCreationAttributes<CountryModel>> {
        const relationData = {
            status: entity.status,
        };

        const relations: RelationMapType = {
            status: {idField: 'statusId', filterField: 'description', repo: this.statusRepository},
        };


        const normalized = await this.normalizeRelations(relationData, relations);

        return {
            id: entity.id,
            description: entity.description,
            statusId: normalized.statusId,
        }
    }

    protected async toEntity(model: CountryBaseRepositoryType["Model"]): Promise<CountryBaseRepositoryType["Entity"]> {
        const normalized = await this.normalizeEntityStatus(model);

        return CountryEntity.create({
            id: normalized.id,
            description: normalized.description,
            status: normalized.status,
        });
    }
}
