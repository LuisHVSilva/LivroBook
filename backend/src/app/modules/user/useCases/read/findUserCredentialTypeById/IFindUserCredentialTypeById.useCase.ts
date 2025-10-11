import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {FindByIdRequestDTO} from "@coreShared/dtos/operation.dto";
import {FindByIdUserCredentialTypeResponseDTO} from "@user/adapters/dtos/userCredentialType.dto";

export interface IFindUserCredentialTypeByIdUseCase extends IUseCase<FindByIdRequestDTO, FindByIdUserCredentialTypeResponseDTO>{

}