import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {FindStatusesDTO, FindStatusesResponseDTO} from "@status/adapters/dtos/status.dto";
import {ResultType} from "@coreShared/types/result.type";

export interface IFindStatusesUseCase extends IUseCase<FindStatusesDTO, ResultType<FindStatusesResponseDTO>> {
}