import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {CreateStatusDTO, CreateStatusResponseDTO} from "@status/adapters/dtos/status.dto";
import {ResultType} from "@coreShared/types/result.type";


export interface ICreateStatusUseCase extends IUseCase<CreateStatusDTO, ResultType<CreateStatusResponseDTO>> {

}