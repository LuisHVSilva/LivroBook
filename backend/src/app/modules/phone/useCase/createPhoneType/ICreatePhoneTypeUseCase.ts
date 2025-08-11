import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {CreatePhoneTypeDTO, CreatePhoneTypeResponseDTO} from "@phone/adapters/dtos/phoneType.dto";
import {ResultType} from "@coreShared/types/result.type";

export interface ICreatePhoneTypeUseCase extends IUseCase<CreatePhoneTypeDTO, ResultType<CreatePhoneTypeResponseDTO>> {

}