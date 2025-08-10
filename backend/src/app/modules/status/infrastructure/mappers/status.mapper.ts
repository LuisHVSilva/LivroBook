import { StatusEntity } from "@status/domain/entities/status.entity";
import { StatusModel } from "@status/infrastructure/models/status.model";
import {BaseInfrastructureMapper} from "@coreShared/base/baseInfrastructureMapper";

type StatusPersistenceDTO = {
    description: string;
    active: boolean;
};

export class StatusMapper implements BaseInfrastructureMapper<StatusEntity, StatusModel, StatusPersistenceDTO>{
    toPersistence(entity: StatusEntity): StatusPersistenceDTO {
        return {
            description: entity.description,
            active: entity.active,
        };
    }

    toEntity(model: StatusModel): StatusEntity {
        return StatusEntity.create({
            id: model.id,
            description: model.description,
            active: model.active,
        });
    }
}
