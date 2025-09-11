import {inject, injectable} from "tsyringe";
import {IPhoneTypeRepository} from "@phone/infrastructure/repositories/interface/IPhoneType.repository";
import {PhoneTypeEntity} from "@phone/domain/entities/phoneType.entity";
import {ModelStatic} from "sequelize";
import {PhoneTypeModel} from "@phone/infrastructure/models/phoneType.model";
import {PhoneTypeBaseRepositoryType} from "@phone/adapters/dtos/phoneType.dto";
import {SequelizeWhereBuilderUtil} from "@coreShared/utils/sequelizeWhereBuilder.util";
import {RepositoryBase} from "@coreShared/base/repository.base";


@injectable()
export class PhoneTypeRepository extends RepositoryBase<PhoneTypeBaseRepositoryType> implements IPhoneTypeRepository {
    constructor(
        @inject("PhoneTypeModel") model: ModelStatic<PhoneTypeModel>,
    ) {
        super(model);
    }

    protected override makeFilter(filters?: PhoneTypeBaseRepositoryType["Filter"]): SequelizeWhereBuilderUtil<PhoneTypeBaseRepositoryType["Filter"]> {
        return super.makeFilter(filters, {
            id: {in: true},
            description: {like: true},
            statusId: {in: true},
        });
    }

    toPersistence(entity: PhoneTypeBaseRepositoryType["Entity"]): PhoneTypeBaseRepositoryType["Persistence"] {
        return {
            description: entity.description,
            statusId: entity.statusId,
        };
    }

    toEntity(model: PhoneTypeBaseRepositoryType["Model"]): PhoneTypeBaseRepositoryType["Entity"] {
        return PhoneTypeEntity.create({
            id: model.id,
            description: model.description,
            statusId: model.statusId,
        });
    }
}