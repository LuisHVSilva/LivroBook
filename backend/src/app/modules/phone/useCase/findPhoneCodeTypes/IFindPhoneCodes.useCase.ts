import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {FindPhoneCodesDTO, FindPhoneCodesResponseDTO} from "@phone/adapters/dtos/phoneCode.dto";

export interface IFindPhoneCodesUseCase extends IUseCase<FindPhoneCodesDTO, FindPhoneCodesResponseDTO> {

}