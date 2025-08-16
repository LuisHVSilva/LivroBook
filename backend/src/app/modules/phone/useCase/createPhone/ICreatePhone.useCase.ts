import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {CreatePhoneDTO, CreatePhoneResponseDTO} from "@phone/adapters/dtos/phone.dto";

export interface ICreatePhoneUseCase extends IUseCase<CreatePhoneDTO, CreatePhoneResponseDTO> {
}