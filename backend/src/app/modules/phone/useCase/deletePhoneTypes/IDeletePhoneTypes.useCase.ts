import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {DeletePhoneTypesResponseDTO, DeletePhoneTypesDTO} from "@phone/adapters/dtos/phoneType.dto";

export interface IDeletePhoneTypesUseCase extends IUseCase<DeletePhoneTypesDTO, DeletePhoneTypesResponseDTO> {
}