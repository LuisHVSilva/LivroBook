import {IUseCase} from "@coreShared/interfaces/usecases";
import {Result} from "@coreShared/types/Result";
import {UpdateDescriptionDTO, UpdateDescriptionResultDTO} from "@status/adapters/dtos/UpdateDescriptionDTO";

export interface IUpdateDescriptionUseCase extends IUseCase<UpdateDescriptionDTO, Result<UpdateDescriptionResultDTO>> {

}