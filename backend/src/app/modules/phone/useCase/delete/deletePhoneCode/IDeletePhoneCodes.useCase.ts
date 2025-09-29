import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {DeleteRequestDTO, DeleteResponseDTO} from "@coreShared/dtos/operation.dto";

export interface IDeletePhoneCodesUseCase extends IUseCase<DeleteRequestDTO, DeleteResponseDTO> {
}