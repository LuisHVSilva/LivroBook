import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {DeleteRequestDTO, DeleteResponseDTO} from "@coreShared/dtos/operation.dto";

export interface IDeleteUserCredentialTypesUseCase extends IUseCase<DeleteRequestDTO, DeleteResponseDTO> {
}