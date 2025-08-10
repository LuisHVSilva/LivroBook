import {BaseInfrastructureMapper} from "@coreShared/base/baseInfrastructureMapper";
import {StateEntity} from "@location/domain/entities/state.entity";
import {StateModel} from "@location/infrastructure/models/state.model";

type StatePersistenceDTO = {
    description: string;
    statusId: number;
    countryId: number;
};

export class StateMapper implements BaseInfrastructureMapper<StateEntity, StateModel, StatePersistenceDTO> {
    toPersistence(entity: StateEntity): StatePersistenceDTO {
        return {
            description: entity.description,
            statusId: entity.statusId,
            countryId: entity.countryId
        };
    }

    toEntity(model: StateModel): StateEntity {
        return StateEntity.create({
            id: model.id,
            description: model.description,
            statusId: model.statusId,
            countryId: model.countryId
        });
    }
}
