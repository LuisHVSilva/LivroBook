import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {UpdatePhoneTypeDTO, UpdatePhoneTypeResponseDTO} from "@phone/adapters/dtos/phoneType.dto";
import {UpdateResultType} from "@coreShared/types/crudResult.type";

export interface IUpdatePhoneTypeUseCase extends IUseCase<UpdatePhoneTypeDTO, UpdateResultType<UpdatePhoneTypeResponseDTO>> {
}