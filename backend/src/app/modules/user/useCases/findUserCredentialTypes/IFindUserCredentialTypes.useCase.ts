import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {
    FindUserCredentialTypesDTO,
    FindUserCredentialTypesResponseDTO
} from "@user/adapters/dtos/userCredentialType.dto";

export interface IFindUserCredentialTypesUseCase extends IUseCase<FindUserCredentialTypesDTO, FindUserCredentialTypesResponseDTO> {
}