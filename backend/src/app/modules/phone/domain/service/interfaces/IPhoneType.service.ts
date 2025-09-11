import {IServiceBase} from "@coreShared/base/interfaces/IServiceBase";
import {PhoneTypeEntity} from "@phone/domain/entities/phoneType.entity";
import {PhoneTypeDtoBaseType} from "@phone/adapters/dtos/phoneType.dto";

export interface IPhoneTypeService extends IServiceBase<PhoneTypeDtoBaseType, PhoneTypeEntity> {

}