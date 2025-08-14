import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {CreatePhoneCodeDTO, CreatePhoneCodeResponseDTO} from "@phone/adapters/dtos/phoneCode.dto";

export interface ICreatePhoneCodeUseCase extends IUseCase<CreatePhoneCodeDTO, CreatePhoneCodeResponseDTO> {
}