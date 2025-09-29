import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {FindStatusesRawDTO, FindStatusesResponseDTO} from "@status/adapters/dtos/status.dto";

export interface IFindStatusesUseCase extends IUseCase<FindStatusesRawDTO, FindStatusesResponseDTO> {
}