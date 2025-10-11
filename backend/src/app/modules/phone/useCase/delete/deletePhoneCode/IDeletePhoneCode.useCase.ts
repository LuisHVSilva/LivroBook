import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {DeleteRequestDTO, DeleteResponseDTO} from "@coreShared/dtos/operation.dto";

export interface IDeletePhoneCodeUseCase extends IUseCase<DeleteRequestDTO, DeleteResponseDTO> {
}