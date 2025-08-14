import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {CreatePhoneTypeDTO, CreatePhoneTypeResponseDTO} from "@phone/adapters/dtos/phoneType.dto";

export interface ICreatePhoneTypeUseCase extends IUseCase<CreatePhoneTypeDTO, CreatePhoneTypeResponseDTO> {

}