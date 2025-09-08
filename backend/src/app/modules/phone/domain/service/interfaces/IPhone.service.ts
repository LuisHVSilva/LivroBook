import {DtoBaseType} from "@coreShared/types/entity.type";
import {CreatePhoneDTO, FindPhonesDTO, PhoneDTO, PhoneFilterDTO, UpdatePhoneDTO} from "@phone/adapters/dtos/phone.dto";
import {IServiceBase} from "@coreShared/base/interfaces/IServiceBase";
import {PhoneEntity} from "@phone/domain/entities/phone.entity";

export type PhoneDtoBaseType = DtoBaseType<
    PhoneDTO,
    CreatePhoneDTO,
    FindPhonesDTO,
    UpdatePhoneDTO,
    PhoneFilterDTO
>

export interface IPhoneService extends IServiceBase<PhoneDtoBaseType, PhoneEntity> {
    findPhoneByNumber(number: string): Promise<PhoneEntity | null>;
}