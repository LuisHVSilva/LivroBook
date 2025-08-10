import {BaseInfrastructureMapper} from "@coreShared/base/baseInfrastructureMapper";
import {CityEntity} from "@location/domain/entities/city.entity";
import {CityModel} from "@location/infrastructure/models/city.model";


type CityPersistenceDTO = {
    description: string;
    stateId: number;
    statusId: number;
};

export class CityMapper implements BaseInfrastructureMapper<CityEntity, CityModel, CityPersistenceDTO> {
    toPersistence(entity: CityEntity): CityPersistenceDTO {
        return {
            description: entity.description,
            stateId: entity.stateId,
            statusId: entity.statusId
        };
    }

    toEntity(model: CityModel): CityEntity {
        return CityEntity.create({
            id: model.id,
            description: model.description,
            stateId: model.stateId,
            statusId: model.statusId
        });
    }
}
