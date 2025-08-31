import {IRepositoryBase} from "@coreShared/base/interfaces/IRepositoryBase";
import {PhoneEntity} from "@phone/domain/entities/phone.entity";
import {PhoneModel} from "@phone/infrastructure/models/phone.model";
import {PhoneFilterDTO, PhonePersistenceDTO} from "@phone/adapters/dtos/phone.dto";
import {BaseRepositoryType} from "@coreShared/types/entity.type";

export type PhoneBaseRepositoryType = BaseRepositoryType<PhoneModel, PhoneEntity, PhoneFilterDTO, PhonePersistenceDTO>;

export interface IPhoneRepository extends IRepositoryBase<PhoneBaseRepositoryType> {
}