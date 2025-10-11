import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {FindByIdRequestDTO} from "@coreShared/dtos/operation.dto";
import {FindByIdPhoneTypeResponseDTO} from "@phone/adapters/dtos/phoneType.dto";

export interface IFindPhoneTypeByIdUseCase extends IUseCase<FindByIdRequestDTO, FindByIdPhoneTypeResponseDTO>{

}