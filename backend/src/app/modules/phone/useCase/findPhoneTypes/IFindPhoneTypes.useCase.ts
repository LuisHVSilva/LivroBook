import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {FindPhoneTypesDTO, FindPhoneTypesResponseDTO} from "@phone/adapters/dtos/phoneType.dto";

export interface IFindPhoneTypesUseCase extends IUseCase<FindPhoneTypesDTO, FindPhoneTypesResponseDTO> {

}