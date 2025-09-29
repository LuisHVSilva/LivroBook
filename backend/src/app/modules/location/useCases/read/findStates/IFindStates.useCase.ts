import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {FindStatesRawDTO, FindStatesResponseDTO} from "@location/adapters/dtos/state.dto";

export interface IFindStatesUseCase extends IUseCase<FindStatesRawDTO, FindStatesResponseDTO> {

}