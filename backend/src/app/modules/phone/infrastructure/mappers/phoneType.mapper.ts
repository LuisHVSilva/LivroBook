import {BaseInfrastructureMapper} from "@coreShared/base/baseInfrastructureMapper";
import {PhoneTypeEntity} from "@phone/domain/entities/phoneType.entity";
import {PhoneTypeModel} from "@phone/infrastructure/models/phoneType.model";

type PhoneTypePersistenceDTO = {
    description: string;
    statusId: number;
};

export class PhoneTypeMapper implements BaseInfrastructureMapper<PhoneTypeEntity, PhoneTypeModel, PhoneTypePersistenceDTO>{
    toPersistence(entity: PhoneTypeEntity): PhoneTypePersistenceDTO {
        return {
            description: entity.description,
            statusId: entity.statusId,
        };
    }

    toEntity(model: PhoneTypeModel): PhoneTypeEntity {
        return PhoneTypeEntity.create({
            id: model.id,
            description: model.description,
            statusId: model.statusId,
        });
    }
}
