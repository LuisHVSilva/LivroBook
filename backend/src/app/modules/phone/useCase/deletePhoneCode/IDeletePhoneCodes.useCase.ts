import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {DeletePhoneCodesDTO, DeletePhoneCodesResponseDTO} from "@phone/adapters/dtos/phoneCode.dto";

export interface IDeletePhoneCodesUseCase extends IUseCase<DeletePhoneCodesDTO, DeletePhoneCodesResponseDTO> {
}