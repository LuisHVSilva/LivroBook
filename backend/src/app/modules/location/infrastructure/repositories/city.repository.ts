import {inject, injectable} from "tsyringe";
import {ModelStatic} from "sequelize";
import {
    CityBaseRepositoryType,
    ICityRepository
} from "@location/infrastructure/repositories/interfaces/ICity.repository";
import {CityEntity} from "@location/domain/entities/city.entity";
import {CityModel} from "@location/infrastructure/models/city.model";
import {CityFilterDTO, CityPersistenceDTO} from "@location/adapters/dtos/city.dto";
import {SequelizeWhereBuilderUtil} from "@coreShared/utils/sequelizeWhereBuilder.util";
import {RepositoryBase} from "@coreShared/base/repository.base";


@injectable()
export class CityRepository extends RepositoryBase<CityBaseRepositoryType> implements ICityRepository {
    constructor(
        @inject("CityModel") model: ModelStatic<CityModel>,
    ) {
        super(model);
    }

    protected makeFilter(filters?: CityFilterDTO): SequelizeWhereBuilderUtil<CityFilterDTO> {
        return super.makeFilter(filters, {
            id: {in: true},
            description: {like: true},
            stateId: {in: true},
            statusId: {in: true},
        });
    }

    protected toPersistence(entity: CityEntity): CityPersistenceDTO {
        return {
            description: entity.description,
            stateId: entity.stateId,
            statusId: entity.statusId
        };
    }

    protected toEntity(model: CityModel): CityEntity {
        return CityEntity.create({
            id: model.id,
            description: model.description,
            stateId: model.stateId,
            statusId: model.statusId
        });
    }

}