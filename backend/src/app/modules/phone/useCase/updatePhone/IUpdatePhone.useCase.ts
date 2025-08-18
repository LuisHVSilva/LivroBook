import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {UpdatePhoneDTO, UpdatePhoneResponseDTO} from "@phone/adapters/dtos/phone.dto";

export interface IUpdatePhoneUseCase extends IUseCase<UpdatePhoneDTO, UpdatePhoneResponseDTO> {
}