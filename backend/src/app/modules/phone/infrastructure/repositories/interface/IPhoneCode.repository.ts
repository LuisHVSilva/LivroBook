import {PhoneCodeEntity} from "@phone/domain/entities/phoneCode.entity";
import {PhoneCodeModel} from "@phone/infrastructure/models/phoneCode.model";
import {PhoneCodeFilterDTO} from "@phone/adapters/dtos/phoneCode.dto";
import {IBaseRepository} from "@coreShared/interfaces/IBaseRepository";

export interface IPhoneCodeRepository extends IBaseRepository<PhoneCodeEntity, PhoneCodeModel, PhoneCodeFilterDTO> {
}