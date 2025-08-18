import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {DeletePhoneDTO, DeletePhoneResponseDTO} from "@phone/adapters/dtos/phone.dto";

export interface IDeletePhoneUseCase extends IUseCase<DeletePhoneDTO, DeletePhoneResponseDTO> {
}