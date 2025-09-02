import {DtoBaseType} from "@coreShared/types/entity.type";
import {IServiceBase} from "@coreShared/base/interfaces/IServiceBase";
import {
    CreatePhoneCodeDTO,
    FindPhoneCodesDTO,
    PhoneCodeDTO, PhoneCodeFilterDTO,
    UpdatePhoneCodeDTO
} from "@phone/adapters/dtos/phoneCode.dto";
import {PhoneCodeEntity} from "@phone/domain/entities/phoneCode.entity";

export type PhoneCodeDtoBaseType = DtoBaseType<
    PhoneCodeDTO,
    CreatePhoneCodeDTO,
    FindPhoneCodesDTO,
    UpdatePhoneCodeDTO,
    PhoneCodeFilterDTO
>

export interface IPhoneCodeService extends IServiceBase<PhoneCodeDtoBaseType, PhoneCodeEntity> {

}