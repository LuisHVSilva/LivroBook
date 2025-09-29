import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {CreateStateDTO, CreateStateResponseDTO} from "@location/adapters/dtos/state.dto";

export interface ICreateStateUseCase extends IUseCase<CreateStateDTO, CreateStateResponseDTO> {}