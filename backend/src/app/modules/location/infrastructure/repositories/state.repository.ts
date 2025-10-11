import {inject, injectable} from "tsyringe";
import {IStateRepository} from "@location/infrastructure/repositories/interfaces/IState.repository";
import {FindOptions, InferCreationAttributes, ModelStatic} from "sequelize";
import {StateEntity} from "@location/domain/entities/state.entity";
import {StateModel} from "@location/infrastructure/models/state.model";
import {StateBaseRepositoryType} from "@location/adapters/dtos/state.dto";
import {RepositoryBase} from "@coreShared/base/repository.base";
import {ICountryRepository} from "@location/infrastructure/repositories/interfaces/ICountry.repository";
import {NotFoundError} from "@coreShared/errors/domain.error";
import {IStatusRepository} from "@status/infrastructure/repositories/IStatusRepository";
import {RelationMapType} from "@coreShared/types/controller.type";

@injectable()
export class StateRepository extends RepositoryBase<StateBaseRepositoryType> implements IStateRepository {
    constructor(
        @inject("StateModel")
        model: ModelStatic<StateModel>,
        @inject("ICountryRepository")
        private readonly countryRepository: ICountryRepository,
        @inject("IStatusRepository")
        protected readonly statusRepository: IStatusRepository,
    ) {
        super(model, statusRepository);
    }

    protected getIncludes(): FindOptions['include'] {
        return [
            {
                association: StateModel.associations.country,
                attributes: ['id', 'description'],
            },
            {
                association: StateModel.associations.status,
                attributes: ['id', 'description'],
            },

        ];
    }

    protected associationMap(): Partial<Record<keyof StateBaseRepositoryType["Filter"], string>> {
        return {
            country: 'country.description',
            status: 'status.description',
        };
    }

    protected filter(): Partial<Record<keyof StateBaseRepositoryType["Filter"], {
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

    protected async toPersistence(
        entity: StateBaseRepositoryType["Entity"]
    ): Promise<InferCreationAttributes<StateModel>> {
        const relationData = {
            country: entity.country,
            status: entity.status,
        };

        const relations: RelationMapType = {
            country: {idField: 'countryId', filterField: 'description', repo: this.countryRepository},
            status: {idField: 'statusId', filterField: 'description', repo: this.statusRepository},
        };


        const normalized = await this.normalizeRelations(relationData, relations);

        return {
            id: entity.id,
            description: entity.description,
            statusId: normalized.statusId,
            countryId: normalized.countryId
        }
    }

    protected async toEntity(model: StateBaseRepositoryType["Model"]): Promise<StateBaseRepositoryType["Entity"]> {
        const normalized = await this.normalizeEntityStatus(model);

        if (!normalized.country?.description) {
            throw new NotFoundError('Sem pais associado para o estado');
        }

        return StateEntity.create({
            id: normalized.id,
            description: normalized.description,
            country: normalized.country.description,
            status: normalized.status,
        });
    }
}