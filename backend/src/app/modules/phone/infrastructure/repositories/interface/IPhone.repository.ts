import {IBaseRepository} from "@coreShared/interfaces/IBaseRepository";
import {PhoneEntity} from "@phone/domain/entities/phone.entity";
import {PhoneModel} from "@phone/infrastructure/models/phone.model";
import {PhoneFilterDTO} from "@phone/adapters/dtos/phone.dto";

export interface IPhoneRepository extends IBaseRepository<PhoneEntity, PhoneModel, PhoneFilterDTO> {
}