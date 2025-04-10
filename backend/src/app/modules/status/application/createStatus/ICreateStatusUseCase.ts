import {IUseCase} from "@coreShared/interfaces/usecases";
import {Result} from "@coreShared/types/Result";
import {CreateStatusDTO, CreateStatusResponseDTO} from "@status/adapters/dtos/CreateStatusDTO";
import {UseCaseError} from "@coreShared/errors/useCaseError";

export interface ICreateStatusUseCase extends IUseCase<CreateStatusDTO, Result<CreateStatusResponseDTO, UseCaseError>> {

}
