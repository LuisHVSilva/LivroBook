import {inject, injectable} from "tsyringe";
import {ModelStatic} from "sequelize";
import {SequelizeWhereBuilderUtil} from "@coreShared/utils/sequelizeWhereBuilder.util";
import {
    IPhoneRepository,
    PhoneBaseRepositoryType
} from "@phone/infrastructure/repositories/interface/IPhone.repository";
import {PhonePersistenceDTO} from "@phone/adapters/dtos/phone.dto";
import {PhoneModel} from "@phone/infrastructure/models/phone.model";
import {RepositoryBase} from "@coreShared/base/repository.base";
import {PhoneEntity} from "@phone/domain/entities/phone.entity";

@injectable()
export class PhoneRepository extends RepositoryBase<PhoneBaseRepositoryType> implements IPhoneRepository {
    constructor(
        @inject("PhoneModel") model: ModelStatic<PhoneModel>,
    ) {
        super(model);
    }

    protected override makeFilter(filters?: PhoneBaseRepositoryType["Filter"]): SequelizeWhereBuilderUtil<PhoneBaseRepositoryType["Filter"]> {
        return super.makeFilter(filters, {
            id: {in: true},
            phoneCodeId: {in: true},
            phoneTypeId: {in: true},
            statusId: {in: true},
        });
    }

    protected toPersistence(entity: PhoneEntity): PhonePersistenceDTO {
        return {
            number: entity.number,
            phoneCodeId: entity.phoneCodeId,
            phoneTypeId: entity.phoneTypeId,
            statusId: entity.statusId,
        };
    }

    protected toEntity(model: PhoneModel): PhoneEntity {
        return PhoneEntity.create({
            id: model.id,
            number: model.number,
            phoneCodeId: model.phoneCodeId,
            phoneTypeId: model.phoneTypeId,
            statusId: model.statusId,
        });
    }
}