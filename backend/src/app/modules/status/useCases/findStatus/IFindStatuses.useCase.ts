import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {FindStatusesDTO, FindStatusesResponseDTO} from "@status/adapters/dtos/status.dto";

export interface IFindStatusesUseCase extends IUseCase<FindStatusesDTO, FindStatusesResponseDTO> {
}