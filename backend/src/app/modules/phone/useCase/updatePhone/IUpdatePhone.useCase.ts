import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {UpdatePhoneDTO} from "@phone/adapters/dtos/phone.dto";
import {UpdateResultType} from "@coreShared/types/crudResult.type";
import {PhoneEntity} from "@phone/domain/entities/phone.entity";

export interface IUpdatePhoneUseCase extends IUseCase<UpdatePhoneDTO, UpdateResultType<PhoneEntity>> {
}