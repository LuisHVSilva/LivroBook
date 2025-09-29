import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {FindUserTypesRawDTO, FindUserTypesResponseDTO} from "@user/adapters/dtos/userType.dto";

export interface IFindUserTypesUseCase extends IUseCase<FindUserTypesRawDTO, FindUserTypesResponseDTO> {
}