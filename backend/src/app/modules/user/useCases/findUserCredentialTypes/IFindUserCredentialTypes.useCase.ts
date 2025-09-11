import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {
    FindUserCredentialTypesRawDTO,
    FindUserCredentialTypesResponseDTO
} from "@user/adapters/dtos/userCredentialType.dto";

export interface IFindUserCredentialTypesUseCase extends IUseCase<FindUserCredentialTypesRawDTO, FindUserCredentialTypesResponseDTO> {
}