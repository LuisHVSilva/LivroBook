import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {CreateLocationDTO, CreateLocationResponseDTO} from "@location/adapters/dtos/location.dto";

export interface ICreateLocationUseCase extends IUseCase<CreateLocationDTO, CreateLocationResponseDTO> {
}