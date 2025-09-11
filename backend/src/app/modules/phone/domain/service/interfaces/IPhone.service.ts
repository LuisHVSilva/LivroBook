import {IServiceBase} from "@coreShared/base/interfaces/IServiceBase";
import {PhoneEntity} from "@phone/domain/entities/phone.entity";
import {PhoneDtoBaseType} from "@phone/adapters/dtos/phone.dto";

export interface IPhoneService extends IServiceBase<PhoneDtoBaseType, PhoneEntity> {
}