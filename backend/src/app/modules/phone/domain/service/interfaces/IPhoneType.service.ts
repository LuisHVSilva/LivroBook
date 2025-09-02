import {DtoBaseType} from "@coreShared/types/entity.type";
import {
    CreatePhoneTypeDTO,
    FindPhoneTypesDTO,
    PhoneTypeDTO, PhoneTypeFilterDTO,
    UpdatePhoneTypeDTO
} from "@phone/adapters/dtos/phoneType.dto";
import {IServiceBase} from "@coreShared/base/interfaces/IServiceBase";
import {PhoneTypeEntity} from "@phone/domain/entities/phoneType.entity";

export type PhoneTypeDtoBaseType = DtoBaseType<
    PhoneTypeDTO,
    CreatePhoneTypeDTO,
    FindPhoneTypesDTO,
    UpdatePhoneTypeDTO,
    PhoneTypeFilterDTO
>

export interface IPhoneTypeService extends IServiceBase<PhoneTypeDtoBaseType, PhoneTypeEntity> {

}