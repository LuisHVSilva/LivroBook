import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {FindByIdRequestDTO} from "@coreShared/dtos/operation.dto";
import {FindByIdUserResponseDTO} from "@user/adapters/dtos/user.dto";

export interface IFindUserByIdUseCase extends IUseCase<FindByIdRequestDTO, FindByIdUserResponseDTO>{

}