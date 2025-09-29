import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {UpdateUserDTO, UpdateUserResponseDTO} from "@user/adapters/dtos/user.dto";
import {UpdateResultType} from "@coreShared/types/crudResult.type";

export interface IUpdateUserUseCase extends IUseCase<UpdateUserDTO, UpdateResultType<UpdateUserResponseDTO>> {
}