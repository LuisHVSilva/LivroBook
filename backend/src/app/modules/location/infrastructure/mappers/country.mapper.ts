import {BaseInfrastructureMapper} from "@coreShared/base/baseInfrastructureMapper";
import {CountryEntity} from "@location/domain/entities/country.entity";
import {CountryModel} from "@location/infrastructure/models/country.model";

type CountryPersistenceDTO = {
    description: string;
    statusId: number;
};

export class CountryMapper implements BaseInfrastructureMapper<CountryEntity, CountryModel, CountryPersistenceDTO> {
    toPersistence(entity: CountryEntity): CountryPersistenceDTO {
        return {
            description: entity.description,
            statusId: entity.statusId,
        };
    }

    toEntity(model: CountryModel): CountryEntity {
        return CountryEntity.create({
            id: model.id,
            description: model.description,
            statusId: model.statusId,
        });
    }
}
