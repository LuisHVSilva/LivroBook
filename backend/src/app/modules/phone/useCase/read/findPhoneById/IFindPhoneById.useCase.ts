import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {FindByIdRequestDTO} from "@coreShared/dtos/operation.dto";
import {FindByIdPhoneResponseDTO} from "@phone/adapters/dtos/phone.dto";

export interface IFindPhoneByIdUseCase extends IUseCase<FindByIdRequestDTO, FindByIdPhoneResponseDTO>{

}