import {inject, injectable} from "tsyringe";
import {FindOptions, InferCreationAttributes, ModelStatic} from "sequelize";
import {ICityRepository} from "@location/infrastructure/repositories/interfaces/ICity.repository";
import {CityEntity} from "@location/domain/entities/city.entity";
import {CityModel} from "@location/infrastructure/models/city.model";
import {CityBaseRepositoryType} from "@location/adapters/dtos/city.dto";
import {RepositoryBase} from "@coreShared/base/repository.base";
import {RelationMapType} from "@coreShared/types/controller.type";
import {IStateRepository} from "@location/infrastructure/repositories/interfaces/IState.repository";
import {IStatusRepository} from "@status/infrastructure/repositories/IStatusRepository";
import {NotFoundError} from "@coreShared/errors/classes.error";


@injectable()
export class CityRepository extends RepositoryBase<CityBaseRepositoryType> implements ICityRepository {
    constructor(
        @inject("CityModel")
        model: ModelStatic<CityModel>,
        @inject('IStateRepository')
        private readonly stateRepository: IStateRepository,
        @inject("IStatusRepository")
        protected readonly statusRepository: IStatusRepository,
    ) {
        super(model);
    }

    protected getIncludes(): FindOptions['include'] {
        return [
            {
                association: CityModel.associations.state,
                attributes: ['id', 'description'],
            },
            {
                association: CityModel.associations.status,
                attributes: ['id', 'description'],
            },

        ];
    }

    protected associationMap(): Partial<Record<keyof CityBaseRepositoryType["Filter"], string>> {
        return {
            state: 'state.description',
            status: 'status.description',
        };
    }

    protected filter(): Partial<Record<keyof CityBaseRepositoryType["Filter"], {
        in?: boolean;
        like?: boolean
    }>> | undefined {
        return {
            id: {in: true},
            description: {like: true},
            state: {like: true},
            status: {like: true},
        };
    }

    protected async toPersistence(entity: CityBaseRepositoryType["Entity"]): Promise<InferCreationAttributes<CityModel>> {
        const relationData = {
            state: entity.state,
            status: entity.status,
        }

        const relations: RelationMapType = {
            state: {idField: 'stateId', filterField: 'description', repo: this.stateRepository},
            status: {idField: 'statusId', filterField: 'description', repo: this.statusRepository},
        }

        const normalized = await this.normalizeRelations(relationData, relations);

        return {
            id: entity.id,
            description: entity.description,
            stateId: normalized.stateId,
            statusId: normalized.statusId
        };
    }

    protected async toEntity(model: CityBaseRepositoryType["Model"]): Promise<CityBaseRepositoryType["Entity"]> {
        const normalized = await this.normalizeEntityStatus(model);

        if (!normalized.state?.description) {
            throw new NotFoundError('Sem estado associado para a cidade');
        }

        return CityEntity.create({
            id: model.id,
            description: model.description,
            state: normalized.state.description,
            status: normalized.status
        });
    }
}