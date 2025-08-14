import {BaseInfrastructureMapper} from "@coreShared/base/baseInfrastructureMapper";
import {PhoneCodeEntity} from "@phone/domain/entities/phoneCode.entity";
import {PhoneCodeModel} from "@phone/infrastructure/models/phoneCode.model";

type PhoneCodePersistenceDTO = {
    ddiCode: string;
    dddCode: string;
    stateId: number;
    statusId: number;
};

export class PhoneCodeMapper implements BaseInfrastructureMapper<PhoneCodeEntity, PhoneCodeModel, PhoneCodePersistenceDTO>{
    toPersistence(entity: PhoneCodeEntity): PhoneCodePersistenceDTO {
        return {
            ddiCode: entity.ddiCode,
            dddCode: entity.dddCode,
            stateId: entity.stateId,
            statusId: entity.statusId,
        };
    }

    toEntity(model: PhoneCodeModel): PhoneCodeEntity {
        return PhoneCodeEntity.create({
            id: model.id,
            ddiCode: model.ddiCode,
            dddCode: model.dddCode,
            stateId: model.stateId,
            statusId: model.statusId,
        });
    }
}
