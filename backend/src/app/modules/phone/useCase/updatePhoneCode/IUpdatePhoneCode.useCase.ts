import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {UpdatePhoneCodeDTO, UpdatePhoneCodeResponseDTO} from "@phone/adapters/dtos/phoneCode.dto";
import {UpdateResultType} from "@coreShared/types/crudResult.type";

export interface IUpdatePhoneCodeUseCase extends IUseCase<UpdatePhoneCodeDTO, UpdateResultType<UpdatePhoneCodeResponseDTO>> {
}