import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {FindByIdRequestDTO} from "@coreShared/dtos/operation.dto";
import {FindByIdPhoneCodeResponseDTO} from "@phone/adapters/dtos/phoneCode.dto";

export interface IFindPhoneCodeByIdUseCase extends IUseCase<FindByIdRequestDTO, FindByIdPhoneCodeResponseDTO>{

}