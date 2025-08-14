import {IBaseRepository} from "@coreShared/interfaces/IBaseRepository";
import {PhoneTypeEntity} from "@phone/domain/entities/phoneType.entity";
import {PhoneTypeModel} from "@phone/infrastructure/models/phoneType.model";
import {PhoneTypeFilterDTO} from "@phone/adapters/dtos/phoneType.dto";

export interface IPhoneTypeRepository extends IBaseRepository<PhoneTypeEntity, PhoneTypeModel, PhoneTypeFilterDTO> {
}