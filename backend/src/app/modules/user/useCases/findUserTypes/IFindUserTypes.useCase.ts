import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {FindUserTypesDTO, FindUserTypesResponseDTO} from "@user/adapters/dtos/userType.dto";

export interface IFindUserTypesUseCase extends IUseCase<FindUserTypesDTO, FindUserTypesResponseDTO> {
}