import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {FindPhonesRawDTO, FindPhonesResponseDTO} from "@phone/adapters/dtos/phone.dto";


export interface IFindPhonesUseCase extends IUseCase<FindPhonesRawDTO, FindPhonesResponseDTO> {
}
