import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {FindUsersRawDTO, FindUsersResponseDTO} from "@user/adapters/dtos/user.dto";

export interface IFindUsersUseCase extends IUseCase<FindUsersRawDTO, FindUsersResponseDTO> {
}