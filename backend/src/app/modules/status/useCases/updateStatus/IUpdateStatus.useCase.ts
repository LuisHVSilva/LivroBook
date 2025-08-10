import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {UpdateStatusDTO, UpdateStatusResponseDTO} from "@status/adapters/dtos/status.dto";
import {ResultType} from "@coreShared/types/result.type";

export interface IUpdateStatusUseCase extends IUseCase<UpdateStatusDTO, ResultType<UpdateStatusResponseDTO>> {}