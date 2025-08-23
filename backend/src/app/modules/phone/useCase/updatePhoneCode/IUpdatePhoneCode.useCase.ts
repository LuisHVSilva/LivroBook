import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {UpdatePhoneCodeDTO} from "@phone/adapters/dtos/phoneCode.dto";
import {UpdateResultType} from "@coreShared/types/crudResult.type";
import {PhoneCodeEntity} from "@phone/domain/entities/phoneCode.entity";

export interface IUpdatePhoneCodeUseCase extends IUseCase<UpdatePhoneCodeDTO, UpdateResultType<PhoneCodeEntity>> {
}