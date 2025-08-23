import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {UpdatePhoneTypeDTO} from "@phone/adapters/dtos/phoneType.dto";
import {UpdateResultType} from "@coreShared/types/crudResult.type";
import {PhoneTypeEntity} from "@phone/domain/entities/phoneType.entity";

export interface IUpdatePhoneTypeUseCase extends IUseCase<UpdatePhoneTypeDTO, UpdateResultType<PhoneTypeEntity>> {
}