import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {FindByIdRequestDTO} from "@coreShared/dtos/operation.dto";
import {FindByIdStateResponseDTO} from "@location/adapters/dtos/state.dto";

export interface IFindStateByIdUseCase extends IUseCase<FindByIdRequestDTO, FindByIdStateResponseDTO> {
}