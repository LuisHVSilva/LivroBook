import {BaseInfrastructureMapper} from "@coreShared/base/baseInfrastructureMapper";
import {PhoneEntity} from "@phone/domain/entities/phone.entity";
import {PhoneModel} from "@phone/infrastructure/models/phone.model";

type PhonePersistenceDTO = {
    number: string;
    phoneCodeId: number;
    phoneTypeId: number;
    statusId: number;
};

export class PhoneMapper implements BaseInfrastructureMapper<PhoneEntity, PhoneModel, PhonePersistenceDTO>{
    toPersistence(entity: PhoneEntity): PhonePersistenceDTO {
        return {
            number: entity.number,
            phoneCodeId: entity.phoneCodeId,
            phoneTypeId: entity.phoneTypeId,
            statusId: entity.statusId,
        };
    }

    toEntity(model: PhoneModel): PhoneEntity {
        return PhoneEntity.create({
            id: model.id,
            number: model.number,
            phoneCodeId: model.phoneCodeId,
            phoneTypeId: model.phoneTypeId,
            statusId: model.statusId,
        });
    }
}
