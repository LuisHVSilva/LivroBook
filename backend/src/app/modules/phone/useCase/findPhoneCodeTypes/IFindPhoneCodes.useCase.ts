import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {FindPhoneCodesRawDTO, FindPhoneCodesResponseDTO} from "@phone/adapters/dtos/phoneCode.dto";

export interface IFindPhoneCodesUseCase extends IUseCase<FindPhoneCodesRawDTO, FindPhoneCodesResponseDTO> {

}