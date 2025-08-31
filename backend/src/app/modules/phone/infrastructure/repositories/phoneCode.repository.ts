import {inject, injectable} from "tsyringe";
import {PhoneCodeEntity} from "@phone/domain/entities/phoneCode.entity";
import {ModelStatic} from "sequelize";
import {PhoneCodeModel} from "@phone/infrastructure/models/phoneCode.model";
import {PhoneCodeFilterDTO, PhoneCodePersistenceDTO} from "@phone/adapters/dtos/phoneCode.dto";
import {SequelizeWhereBuilderUtil} from "@coreShared/utils/sequelizeWhereBuilder.util";
import {
    IPhoneCodeRepository,
    PhoneCodeBaseRepository
} from "@phone/infrastructure/repositories/interface/IPhoneCode.repository";
import {RepositoryBase} from "@coreShared/base/repository.base";


@injectable()
export class PhoneCodeRepository extends RepositoryBase<PhoneCodeBaseRepository> implements IPhoneCodeRepository {
    constructor(
        @inject("PhoneCodeModel") model: ModelStatic<PhoneCodeModel>,
    ) {
        super(model);
    }

    protected override makeFilter(filters?: PhoneCodeFilterDTO): SequelizeWhereBuilderUtil<PhoneCodeFilterDTO> {

        return super.makeFilter(filters, {
            id: {in: true},
            ddiCode: {in: true},
            dddCode: {in: true},
            stateId: {in: true},
            statusId: {in: true},
        });
    }

    protected toPersistence(entity: PhoneCodeEntity): PhoneCodePersistenceDTO {
        return {
            ddiCode: entity.ddiCode,
            dddCode: entity.dddCode,
            stateId: entity.stateId,
            statusId: entity.statusId,
        };
    }

    protected toEntity(model: PhoneCodeModel): PhoneCodeEntity {
        return PhoneCodeEntity.create({
            id: model.id,
            ddiCode: model.ddiCode,
            dddCode: model.dddCode,
            stateId: model.stateId,
            statusId: model.statusId,
        });
    }
}