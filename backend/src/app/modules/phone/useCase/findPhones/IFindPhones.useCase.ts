import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {FindPhonesDTO, FindPhonesResponseDTO} from "@phone/adapters/dtos/phone.dto";


export interface IFindPhonesUseCase extends IUseCase<FindPhonesDTO, FindPhonesResponseDTO> {
}
