import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {UpdatePhoneCodeDTO, UpdatePhoneCodeResponseDTO} from "@phone/adapters/dtos/phoneCode.dto";

export interface IUpdatePhoneCodeUseCase extends IUseCase<UpdatePhoneCodeDTO, UpdatePhoneCodeResponseDTO> {
}