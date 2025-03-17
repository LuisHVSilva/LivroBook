import {IUseCase} from "@coreShared/interfaces/usecases";
import {Result} from "@coreShared/types/Result";
import {GetStatusDTO, GetStatusResponseDTO} from "@status/adapters/dtos/GetStatusDTO";

export interface IGetStatusUseCase extends IUseCase<GetStatusDTO, Result<GetStatusResponseDTO>> {
}
