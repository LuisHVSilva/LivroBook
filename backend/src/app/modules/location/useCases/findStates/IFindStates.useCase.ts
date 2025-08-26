import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {FindStatesDTO, FindStatesResponseDTO} from "@location/adapters/dtos/state.dto";

export interface IFindStatesUseCase extends IUseCase<FindStatesDTO, FindStatesResponseDTO> {

}