import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {UpdatePhoneTypeDTO, UpdatePhoneTypeResponseDTO} from "@phone/adapters/dtos/phoneType.dto";

export interface IUpdatePhoneTypeUseCase extends IUseCase<UpdatePhoneTypeDTO, UpdatePhoneTypeResponseDTO> {
}