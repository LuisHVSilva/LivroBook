import {IRepositoryBase} from "@coreShared/base/interfaces/IRepositoryBase";
import {PhoneTypeEntity} from "@phone/domain/entities/phoneType.entity";
import {PhoneTypeModel} from "@phone/infrastructure/models/phoneType.model";
import {PhoneTypeFilterDTO, PhoneTypePersistenceDTO} from "@phone/adapters/dtos/phoneType.dto";
import {BaseRepositoryType} from "@coreShared/types/entity.type";

export type PhoneTypeBaseRepositoryType = BaseRepositoryType<
    PhoneTypeModel,
    PhoneTypeEntity,
    PhoneTypeFilterDTO,
    PhoneTypePersistenceDTO
>;

export interface IPhoneTypeRepository extends IRepositoryBase<PhoneTypeBaseRepositoryType> {
}