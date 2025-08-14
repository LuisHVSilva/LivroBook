import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {CreateStatusDTO, CreateStatusResponseDTO} from "@status/adapters/dtos/status.dto";

export interface ICreateStatusUseCase extends IUseCase<CreateStatusDTO, CreateStatusResponseDTO> {

}