import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {UpdatePhoneDTO, UpdatePhoneResponseDTO} from "@phone/adapters/dtos/phone.dto";
import {UpdateResultType} from "@coreShared/types/crudResult.type";

export interface IUpdatePhoneUseCase extends IUseCase<UpdatePhoneDTO, UpdateResultType<UpdatePhoneResponseDTO>> {
}