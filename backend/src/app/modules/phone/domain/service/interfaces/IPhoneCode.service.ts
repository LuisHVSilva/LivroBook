import {IServiceBase} from "@coreShared/base/interfaces/IServiceBase";
import {PhoneCodeEntity} from "@phone/domain/entities/phoneCode.entity";
import {PhoneCodeDtoBaseType} from "@phone/adapters/dtos/phoneCode.dto";

export interface IPhoneCodeService extends IServiceBase<PhoneCodeDtoBaseType, PhoneCodeEntity> {

}