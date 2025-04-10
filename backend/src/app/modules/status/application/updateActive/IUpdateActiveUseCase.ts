import {IUseCase} from "@coreShared/interfaces/usecases";
import {Result} from "@coreShared/types/Result";
import {UpdateActiveDTO, UpdateActiveResponseDTO} from "@status/adapters/dtos/UpdateActiveDTO";


export interface IUpdateActiveUseCase extends IUseCase<UpdateActiveDTO, Result<UpdateActiveResponseDTO>> {}