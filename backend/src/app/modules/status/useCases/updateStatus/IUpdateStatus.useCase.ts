import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {UpdateStatusDTO, UpdateStatusResponseDTO} from "@status/adapters/dtos/status.dto";

export interface IUpdateStatusUseCase extends IUseCase<UpdateStatusDTO, UpdateStatusResponseDTO> {
}