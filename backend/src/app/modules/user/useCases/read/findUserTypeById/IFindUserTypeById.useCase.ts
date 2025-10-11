import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {FindByIdRequestDTO} from "@coreShared/dtos/operation.dto";
import {FindByIdUserTypeResponseDTO} from "@user/adapters/dtos/userType.dto";

export interface IFindUserTypeByIdUseCase extends IUseCase<FindByIdRequestDTO, FindByIdUserTypeResponseDTO>{

}