import {inject, injectable} from "tsyringe";
import {ModelStatic} from "sequelize";
import {ICityRepository} from "@location/infrastructure/repositories/interfaces/ICity.repository";
import {CityEntity} from "@location/domain/entities/city.entity";
import {CityModel} from "@location/infrastructure/models/city.model";
import {CityBaseRepositoryType} from "@location/adapters/dtos/city.dto";
import {SequelizeWhereBuilderUtil} from "@coreShared/utils/sequelizeWhereBuilder.util";
import {RepositoryBase} from "@coreShared/base/repository.base";


@injectable()
export class CityRepository extends RepositoryBase<CityBaseRepositoryType> implements ICityRepository {
    constructor(
        @inject("CityModel") model: ModelStatic<CityModel>,
    ) {
        super(model);
    }

    protected makeFilter(filters?: CityBaseRepositoryType["Filter"]): SequelizeWhereBuilderUtil<CityBaseRepositoryType["Filter"]> {
        return super.makeFilter(filters, {
            id: {in: true},
            description: {like: true},
            stateId: {in: true},
            statusId: {in: true},
        });
    }

    protected toPersistence(entity: CityBaseRepositoryType["Entity"]): CityBaseRepositoryType["Persistence"] {
        return {
            description: entity.description,
            stateId: entity.stateId,
            statusId: entity.statusId
        };
    }

    protected toEntity(model: CityBaseRepositoryType["Model"]): CityBaseRepositoryType["Entity"] {
        return CityEntity.create({
            id: model.id,
            description: model.description,
            stateId: model.stateId,
            statusId: model.statusId
        });
    }

}