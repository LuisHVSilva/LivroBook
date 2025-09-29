import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {UpdateUserTypeDTO, UpdateUserTypeResponseDTO} from "@user/adapters/dtos/userType.dto";
import {UpdateResultType} from "@coreShared/types/crudResult.type";

export interface IUpdateUserTypeUseCase extends IUseCase<UpdateUserTypeDTO, UpdateResultType<UpdateUserTypeResponseDTO>> {
}