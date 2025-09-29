import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {FindPhoneTypesRawDTO, FindPhoneTypesResponseDTO} from "@phone/adapters/dtos/phoneType.dto";

export interface IFindPhoneTypesUseCase extends IUseCase<FindPhoneTypesRawDTO, FindPhoneTypesResponseDTO> {

}